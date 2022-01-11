import { json, geoContains } from "d3";

// // @2.0.0 latest commonjs compliant release of d3-geo
// // @6.7.0 latest commonjs compliant release of d3

var geojson = json("https://islamjamil.github.io/SFH_MFH_Ineligible20180823.geojson")

export async function isEligible(lon, lat, state) {
  const data = await geojson;
  for (var feature of data.features) {
    if (feature.properties.STUSPS == state && geoContains(feature, [lon, lat])) {
      return false;
    }
  }
  return true;
}

