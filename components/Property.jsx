import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({ property: { imgSrc, price, bedrooms, address, bathrooms, livingArea, zpid }, width, height, imgWidth, imgHeight, padding }) => (
  <Link href={`/property/${zpid}`} passHref>
    {/* 420 400 */}
    <a target="_blank">
      <Flex flexWrap='wrap' w={width + "px"} h={height + "px"} p={padding} paddingTop="5" paddingBottom="5" justifyContent='flex-start' cursor='pointer' >
        <Box>
          <Image src={imgSrc ? imgSrc : DefaultImage} width={imgWidth} height={imgHeight} priority />
        </Box>
        <Box w='full'>
          <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              {/* <Box paddingRight='3' color='green.400'>{<GoVerified />}</Box> */}
              <Text fontWeight='bold' fontSize='lg'>${price.toLocaleString()}</Text>
            </Flex>
            <Box>
            </Box>
          </Flex>
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
            {bedrooms} <FaBed /> | {bathrooms} <FaBath /> | {livingArea} sqft
          </Flex>
          {width == "305" ? <Text fontSize='lg' width="290px">
            {address}
          </Text> :
            <Text fontSize='lg'>
              {address}
            </Text>}
        </Box>
      </Flex>
    </a>
  </Link >
);

export default Property;