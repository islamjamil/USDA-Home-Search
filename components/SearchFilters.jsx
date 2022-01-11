import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { googleAutocomplete } from '../utils/apiCalls';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { filterData, getFilterValues } from '../utils/filterData';
import noresult from '../assets/images/noresult.svg';
import getCounties from '../utils/getCounty';

export default function SearchFilters() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query });
  };
  let options = null;
  const [state_code, setStateCode] = useState("");
  const changeStateCode = (event) => {
    setStateCode(event.target.value);
  };
  options = getCounties(state_code)
  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters?.map((filter) => (filter.queryName != "county" &&
        <Box key={filter.queryName}>
          <Select onChange={(e) => { searchProperties({ [filter.queryName]: e.target.value }) }} placeholder={filter.placeholder} w='fit-content' p='2' >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      {/* implement drop down below */}
      <Box key={"state"}>
        <Select onChange={changeStateCode} placeholder={"State"} w='fit-content' p='2' >
          {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
            .map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </Select>
      </Box>
      <Box key={"county"}>
        <Select onChange={(e) => { searchProperties({ ["county"]: `${e.target.value}, ${state_code}` }) }} placeholder={"County"} w='fit-content' p='2' >
          {options
            .map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </Select>
      </Box>
    </Flex>
  );
}
