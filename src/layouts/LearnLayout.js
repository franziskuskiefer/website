import React from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import { Global } from '@emotion/core';
import { rgba } from 'polished';

import { media } from '../utils/emotion';
import normalizeCss from '../theme/normalizeCss';
import globalStyles from '../theme/globalStyles';
import ThemeProvider from '../components/themeProvider';
import mdxComponents from '../components/mdxComponents';
import BaseContent from '../components/Content';
import { ModalContextProvider } from '../contexts/ModalContext';
import { LocationContextProvider } from '../contexts/LocationContext';
import TopBarContactFormMessage from '../components/TopBarContactFormMessage/TopBarContactFormMessage';
import LearnHeader from '../components/header/LearnHeader';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  body {
    font-size: ${props => props.theme.fontSizes.body};
  }
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${media.desktop`
      flex-direction: row;
  `}
`;

const HeaderWrapper = styled.div`
  box-shadow: ${({ theme }) =>
    `0 1px 0 0 ${theme.colors.accentBackground}, 0 3px 8px 0 ${rgba(
      theme.colors.accentBackground,
      0.6
    )}`};
  z-index: 2;
  position: relative;
`;

const LearnLayout = ({
  children,
  isOpenSidebar,
  setIsOpenSidebar,
  location,
  algoliaIndexes,
}) => {
  return (
    <ThemeProvider themeName="light">
      <LocationContextProvider location={location}>
        <ModalContextProvider>
          <PageWrapper>
            <Global styles={normalizeCss} />
            <Global styles={globalStyles} />
            <FocusLock disabled={!isOpenSidebar}>
              <HeaderWrapper>
                <TopBarContactFormMessage />
                <BaseContent>
                  <LearnHeader
                    algoliaIndexes={algoliaIndexes}
                    openSidebar={() => setIsOpenSidebar(true)}
                  />
                </BaseContent>
              </HeaderWrapper>
              <BaseContent>
                <Wrapper>
                  <MDXProvider components={mdxComponents}>
                    {children}
                  </MDXProvider>
                </Wrapper>
              </BaseContent>
            </FocusLock>
          </PageWrapper>
        </ModalContextProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
};

LearnLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  location: PropTypes.shape({}).isRequired,
  isOpenSidebar: PropTypes.bool.isRequired,
  setIsOpenSidebar: PropTypes.func.isRequired,
  algoliaIndexes: PropTypes.arrayOf(PropTypes.string),
};

LearnLayout.defaultProps = {
  algoliaIndexes: [],
};

export default LearnLayout;
