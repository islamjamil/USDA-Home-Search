import axios from "axios";
import { isEligible } from "./eligibility";

export var getEligibleHomes = async (options) => {
  var getHomes = async (options) => {
    var response = await axios.request(options);
    var homes = []
    var state = options.params.location.slice(-2);
    state = state.toUpperCase()
    try {
      for (var home of response.data.props) {
        if (home.latitude && home.longitude) {
          var eligibility = await isEligible(
            home.longitude,
            home.latitude,
            state
          );
          if (!home.address.includes("Plan") && eligibility) {
            if (await addressToLatLng(home.address)) {
              homes.push(home)
            }
          }
        }
      }
      return [response, homes];
    }
    catch {
      return [{ data: { totalPages: 1 } }, []]
    }
  };
  var initialCall = await getHomes(options);
  var response = initialCall[0];
  var data = response.data;
  var number_of_pages = data.totalPages;
  var all_homes = initialCall[1];
  while (options.params.page != number_of_pages) {
    options.params.page += 1;
    delay(500)
    var apiCall = await getHomes(options);
    all_homes = all_homes.concat(apiCall[1])
    if (options.params.page > 7) {
      break
    }
  }
  return all_homes
};
var delay = (ms) => {
  var startPoint = new Date().getTime()
  while (new Date().getTime() - startPoint <= ms) {/* wait */ }
}

export var addressToLatLng = async (address) => {
  return true
};


