import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { server } from "../utils/domainName"
import Property from './Property';
import ReactDOMServer from 'react-dom/server';
import { Flex } from '@chakra-ui/react';


function MyComponent({ containerStyle, homes }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.google_maps_api_key
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        for (var home of homes) {
            var { latitude, longitude, address, zpid, price } = home
            var marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                title: address,
                url: `${server}/property/${zpid}`,
                home: home,
            });
            if (zpid) {
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(this.url);
                });
                let infowindow
                google.maps.event.addListener(marker, 'mouseover', function () {
                    infowindow = new google.maps.InfoWindow({
                        content: ReactDOMServer.renderToString(
                            <Flex overflowX="hidden"><a href={`${server}/property/${this.home.zpid}`} target="_blank"><Property property={this.home} width="400" height="317" imgWidth="400" imgHeight="260"></Property></a></Flex>
                        ),
                        disableAutoPan: false
                    });
                    infowindow.open({
                        anchor: this,
                        map,
                        shouldFocus: false,
                    });
                })
                google.maps.event.addListener(marker, 'mouseout', function (e) {
                    infowindow.close()
                })

            }
            marker.setMap(map);
            bounds.extend(new google.maps.LatLng(latitude, longitude))

        }
        if (homes.length == 1) {
            var location = new google.maps.LatLng(homes[0].latitude, homes[0].longitude)
            map.setCenter(location)
            map.setZoom(10)
        }
        else {
            map.fitBounds(bounds)
        }
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
        // key={homes[0].zpid}
        >
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)