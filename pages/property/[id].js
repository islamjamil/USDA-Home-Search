import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import Image from 'next/image';
import zillow_img from "../../assets/images/Zillow_Logo.png"
import { server } from '../../utils/domainName';
import Map from "../../components/maps"
import axios from "axios"
import { isMobile } from "react-device-detect"


//
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'



const PropertyDetails = ({ propertyDetails: { monthlyHoaFee, longitude, latitude, propertyTaxRate, images, price, bedrooms, bathrooms, livingArea, resoFacts: { pricePerSquareFoot, lotSize, yearBuilt, hoaFee, taxAnnualAmount }, description, fullAddress, zestimate, url, timeOnZillow } }) => (
  <Box maxWidth='1000px' margin='auto' p='4'>
    <Carousel showIndicators={!isMobile} emulateTouch={true} showStatus={true} showThumbs={false} swipeable={true} useKeyboardArrows={true} dynamicHeight={true}>
      {images.map((image) => {
        return (
          <div>
            <img src={image} />
          </div>
        )
      })}
    </Carousel>
    <Box w='full' p='6'>
      <Flex paddingTop='2' alignItems='center'>
        <Text fontWeight='bold' fontSize='lg'>
          ${price.toLocaleString()} {zestimate && "- Estimate: $" + zestimate.toLocaleString()}
        </Text>
        <Spacer />
      </Flex>

      <Flex alignItems='center' p='1' w='300px' color='blue.400' justifyContent='space-between'>
        {bedrooms} Beds <FaBed /> | {bathrooms} Baths <FaBath /> | {livingArea} sqft
      </Flex>

    </Box>

    <Box marginTop='2'>
      <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{fullAddress} <Link target="_blank" href={"https://zillow.com" + url}><a target="_blank"><Image src={zillow_img} height="20px" width="20px"></Image></a></Link></Text>
      <Text lineHeight='2' color='gray.600'>{description}</Text>
    </Box>

    <Box width="full" marginTop="2" flexWrap="wrap">
      <Map containerStyle={{
        width: '100%',
        height: "60vh",
        margin: "auto"
      }} homes={[{
        latitude: latitude,
        longitude: longitude,
        address: fullAddress,
        price: price,
        bedrooms: bedrooms,
        bathrooms, bathrooms,
        livingArea: livingArea,
        imgSrc: images[0]
      }]
      } key={new Date().getTime()}></Map>
    </Box>

    <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>

      {timeOnZillow && <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Time on Market</Text>
        <Text fontWeight='bold'>{timeOnZillow}</Text>
      </Flex>}
      {yearBuilt && <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Year Built</Text>
        <Text fontWeight='bold'>{yearBuilt}</Text>
      </Flex>}
      {lotSize && <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Lot Size</Text>
        <Text fontWeight='bold'>{lotSize}</Text>
      </Flex>}
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>HOA Fee</Text>
        <Text fontWeight='bold'>{hoaFee || monthlyHoaFee || "None"}</Text>
      </Flex>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Expected Annual Tax</Text>
        <Text fontWeight='bold'>{propertyTaxRate + "% / $" + taxAnnualAmount || "None"}</Text>
      </Flex>
      {pricePerSquareFoot && <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Price Per Sqft</Text>
        <Text fontWeight='bold'>${pricePerSquareFoot}</Text>
      </Flex>}

    </Flex>
    <Box>


    </Box>

  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const { data } = await axios.get(`${server}/api/homes/${id}`)
  return {
    props: {
      propertyDetails: data,
    },
  };
}
