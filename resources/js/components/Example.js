import { AppProvider, Button, Layout, LegacyCard, Page } from '@shopify/polaris';
import enTranslation from "@shopify/polaris/locales/en.json"
import "@shopify/polaris/build/esm/styles.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';


function Example() {
// const navigate = useNavigate()
    return (
        <Page
            title='Home'
            backAction={{content: "Home", url: ('/')}}
        >
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <p>Hello</p>
                        <Button>clilck Me</Button>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.createRoot(document.getElementById('example')).render(
        <AppProvider i18n={enTranslation}>
            <Example />
        </AppProvider>
    )
}
