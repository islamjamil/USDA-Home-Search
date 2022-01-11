import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon, Spacer } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import noresult from '../assets/images/noresult.svg'
import { server } from '../utils/domainName';
import axios from 'axios';
import Map from "../components/maps"
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { isMobile } from "react-device-detect"

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(true);
  const router = useRouter();

  return (
    <Box>

      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='2xl' p='2' fontWeight='bold'>
        {properties.length != 0 && properties.length} Properties for Sale
      </Text>



      {/* Mobile */}
      {isMobile && properties.length > 0 && <>
        <Flex flexWrap="wrap" marginTop="0" marginBottom="4">
          {properties.length > 0 && <Map containerStyle={{
            width: '100%',
            height: "60vh",
            margin: "auto"
          }} homes={properties} key={new Date().getTime()}></Map>}
        </Flex>
        <Flex justify="center" flexWrap='wrap'>
          {properties && properties.map((property) => <Property padding="5" property={property} width="390" height="400" imgWidth="400" imgHeight="260" key={property.zpid} />)}
        </Flex>
      </>}

      {/* Desktop */}
      {!isMobile && properties.length > 0 && <HStack w="100%">
        <Box w="650px" p="0" margin="0">
          <Map containerStyle={{
            // width: '615px',
            // height: "600px"
            height: "80vh"
          }} homes={properties} key={new Date().getTime()}></Map>
        </Box>
        <Spacer padding="0px" />
        {/* w="425" */}
        <Box p="0" margin="0" w="640px" align="flexEnd" flexWrap="wrap" padding="0" display="flex" justify="flex-end" overflowX="hidden" overflowY="auto" h="82vh" > {/*h="1000px"*/}
          {properties.map((property) => <Property property={property} width="305" height="350" imgWidth="290" imgHeight="216" key={property.zpid} />)}
        </Box>
      </HStack>}



      {
        properties.length === 0 && (
          <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <Image src={noresult} />
            <Text fontSize='xl' marginTop='3'>No USDA Eligible Homes Found.</Text>
          </Flex>
        )
      }
    </Box >
  );
};
export async function getServerSideProps({ query }) {

  var county = query.county || "Pierce County, WA"
  var minPrice = query.minPrice || "0"
  var maxPrice = query.maxPrice || "650000"
  var minSqft = query.minSqft || "0"
  var bedsMin = query.bedsMin || "1"
  var bathsMin = query.bathsMin || "1"
  var sort = query.sort || "Price_Low_High"

  const { data } = await axios.get(`${server}/api/homes?location=${county}&minPrice=${minPrice}&maxPrice=${maxPrice}&bathsMin=${bathsMin}&bathsMax=99&bedsMin=${bedsMin}&bedsMax=99&sqftMin=${minSqft}&sqftMax=2100&sort=${sort}`)
  return {
    props: {
      properties: data
    },
  };
}
export default Search;
