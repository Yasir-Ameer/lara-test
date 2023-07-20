import { AppProvider, Badge, Button, Frame, Layout, LegacyCard, Navigation, Page } from '@shopify/polaris';
import {
    HomeMinor,
    OrdersMinor,
    MarketingMinor,
    ProductsMinor,
  } from '@shopify/polaris-icons';
import enTranslation from "@shopify/polaris/locales/en.json"
import "@shopify/polaris/build/esm/styles.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Home from './Home';


function Example() {
const navigate = useNavigate()
    return (
    //     <Frame>
    //     <Navigation location="/">
    //       <Navigation.Section
    //         items={[
    //           {
    //             url: '#',
    //             excludePaths: ['#'],
    //             label: 'Home',
    //             icon: HomeMinor,
    //           },
    //           {
    //             url: '#',
    //             excludePaths: ['#'],
    //             label: 'Orders',
    //             icon: OrdersMinor,
    //             badge: '15',
    //             subNavigationItems: [
    //               {
    //                 url: '#',
    //                 excludePaths: ['#'],
    //                 disabled: false,
    //                 label: 'Collections',
    //               },
    //               {
    //                 url: '#',
    //                 excludePaths: ['#'],
    //                 disabled: false,
    //                 label: 'Inventory',
    //               },
    //             ],
    //           },
    //           {
    //             url: '#',
    //             excludePaths: ['#'],
    //             label: 'Marketing',
    //             icon: MarketingMinor,
    //             badge: '15',
    //             subNavigationItems: [
    //               {
    //                 url: '#',
    //                 excludePaths: ['#'],
    //                 disabled: false,
    //                 label: 'Reports',
    //               },
    //               {
    //                 url: '#',
    //                 excludePaths: ['#'],
    //                 disabled: false,
    //                 label: 'Live view',
    //               },
    //             ],
    //           },
    //           {
    //             url: '#',
    //             label: 'Products',
    //             icon: ProductsMinor,
    //             selected: true,
    //             subNavigationItems: [
    //               {
    //                 url: '#',
    //                 excludePaths: ['#'],
    //                 disabled: false,
    //                 label: 'Collections',
    //               },
    //               {
    //                 url: '#',
    //                 disabled: false,
    //                 label: 'Inventory',
    //               },
    //             ],
    //           },
    //         ]}
    //       />
    //     </Navigation>
    //   </Frame>
    <Home />
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.createRoot(document.getElementById('example')).render(
        <AppProvider i18n={enTranslation}>
            <BrowserRouter>
                <Example />
            </BrowserRouter>
        </AppProvider>
    )
}
