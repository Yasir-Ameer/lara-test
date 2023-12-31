import {
    ActionList,
    AppProvider,
    LegacyCard,
    ContextualSaveBar,
    FormLayout,
    Frame,
    Layout,
    Loading,
    Modal,
    Navigation,
    Page,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    VerticalStack,
    TextField,
    Toast,
    TopBar,
  } from '@shopify/polaris';
  import {
    ArrowLeftMinor,
    HomeMajor,
    OrdersMajor,
    ConversationMinor,
  } from '@shopify/polaris-icons';
import axios from 'axios';
  import {useState, useCallback, useRef} from 'react';

  function Home() {
    const defaultState = useRef({
      emailFieldValue: 'iamyasirameer@gmail.com',
      nameFieldValue: 'Yasir Ameer',
    });
    const skipToContentRef = useRef(null);

    const [toastActive, setToastActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [nameFieldValue, setNameFieldValue] = useState(
      defaultState.current.nameFieldValue,
    );
    const [emailFieldValue, setEmailFieldValue] = useState(
      defaultState.current.emailFieldValue,
    );
    const [storeName, setStoreName] = useState(
      defaultState.current.nameFieldValue,
    );
    const [supportSubject, setSupportSubject] = useState('');
    const [supportMessage, setSupportMessage] = useState('');

    const handleSubjectChange = useCallback(
      (value) => setSupportSubject(value),
      [],
    );
    const handleMessageChange = useCallback(
      (value) => setSupportMessage(value),
      [],
    );
    const handleDiscard = useCallback(() => {
      setEmailFieldValue(defaultState.current.emailFieldValue);
      setNameFieldValue(defaultState.current.nameFieldValue);
      setIsDirty(false);
    }, []);
    const handleSave = useCallback(() => {
      defaultState.current.nameFieldValue = nameFieldValue;
      defaultState.current.emailFieldValue = emailFieldValue;

      setIsDirty(false);
      setToastActive(true);
      setStoreName(defaultState.current.nameFieldValue);


    }, [emailFieldValue, nameFieldValue]);
    const handleNameFieldChange = useCallback((value) => {
      setNameFieldValue(value);
      value && setIsDirty(true);
    }, []);
    const handleEmailFieldChange = useCallback((value) => {
      setEmailFieldValue(value);
      value && setIsDirty(true);
    }, []);
    const handleSearchResultsDismiss = useCallback(() => {
      setSearchActive(false);
      setSearchValue('');
    }, []);
    const handleSearchFieldChange = useCallback((value) => {
      setSearchValue(value);
      setSearchActive(value.length > 0);
    }, []);
    const toggleToastActive = useCallback(
      () => setToastActive((toastActive) => !toastActive),
      [],
    );
    const toggleUserMenuActive = useCallback(
      () => setUserMenuActive((userMenuActive) => !userMenuActive),
      [],
    );
    const toggleMobileNavigationActive = useCallback(
      () =>
        setMobileNavigationActive(
          (mobileNavigationActive) => !mobileNavigationActive,
        ),
      [],
    );
    const toggleIsLoading = useCallback(
      () => setIsLoading((isLoading) => !isLoading),
      [],
    );
    const toggleModalActive = useCallback(
      () => setModalActive((modalActive) => !modalActive),
      [],
    );

    const toastMarkup = toastActive ? (
      <Toast onDismiss={toggleToastActive} content="Changes saved" />
    ) : null;

    const userMenuActions = [
      {
        items: [{content: 'Community forums'}],
      },
    ];

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: handleSave,
        }}
        discardAction={{
          onAction: handleDiscard,
        }}
      />
    ) : null;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="Yasir"
        detail={storeName}
        initials="D"
        open={userMenuActive}
        onToggle={toggleUserMenuActive}
      />
    );

    const searchResultsMarkup = (
      <ActionList
        items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
      />
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={toggleMobileNavigationActive}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: 'Back to Home',
              icon: ArrowLeftMinor,
            },
          ]}
        />
        <Navigation.Section
          separator
          title="Kashif Inventory"
          items={[
            {
              label: 'Dashboard',
              icon: HomeMajor,
              onClick: toggleIsLoading,
            },
            {
              label: 'Orders',
              icon: OrdersMajor,
              onClick: toggleIsLoading,
            },
          ]}
          action={{
            icon: ConversationMinor,
            accessibilityLabel: 'Contact support',
            onClick: toggleModalActive,
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const skipToContentTarget = (
      <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
    );

    const actualPageMarkup = (
      <Page title="Account">
        <Layout>
          {skipToContentTarget}
          <Layout.AnnotatedSection
            title="Account details"
            description="This as your account information."
          >
            <LegacyCard sectioned>
              <FormLayout>
                <TextField
                  label="Full name"
                  value={nameFieldValue}
                  onChange={handleNameFieldChange}
                  autoComplete="name"
                />
                <TextField
                  type="email"
                  label="Email"
                  value={emailFieldValue}
                  onChange={handleEmailFieldChange}
                  autoComplete="email"
                />
              </FormLayout>
            </LegacyCard>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <VerticalStack>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </VerticalStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={toggleModalActive}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: toggleModalActive,
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={supportSubject}
              onChange={handleSubjectChange}
              autoComplete="off"
            />
            <TextField
              label="Message"
              value={supportMessage}
              onChange={handleMessageChange}
              autoComplete="off"
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const logo = {
      width: 124,
      topBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      url: '#',
      accessibilityLabel: 'DevJes',
    };

    return (
      <div style={{height: '500px'}}>
        <AppProvider
          i18n={{
            Polaris: {
              Avatar: {
                label: 'Avatar',
                labelWithInitials: 'Avatar with initials {initials}',
              },
              ContextualSaveBar: {
                save: 'Save',
                discard: 'Discard',
              },
              TextField: {
                characterCount: '{count} characters',
              },
              TopBar: {
                toggleMenuLabel: 'Toggle menu',

                SearchField: {
                  clearButtonLabel: 'Clear',
                  search: 'Search',
                },
              },
              Modal: {
                iFrameTitle: 'body markup',
              },
              Frame: {
                skipToContent: 'Skip to content',
                navigationLabel: 'Navigation',
                Navigation: {
                  closeMobileNavigationLabel: 'Close navigation',
                },
              },
            },
          }}
        >
          <Frame
            // logo={logo}
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            skipToContentTarget={skipToContentRef}
          >
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  export default Home;
