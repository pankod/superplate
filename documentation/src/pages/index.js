import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { features } from '../features';
import styles from './styles.module.css';

function Badges() {
  return (
    <div className={styles.topBadges}>
      <a href="https://meercode.io/pankod/superplate">
        <img src="https://meercode.io/badge/pankod/superplate?type=ci-score&branch=master&token=2ZiT8YsoJgt57JB23NYwXrFY3rJHZboT&lastDay=31" alt="Meercode CI Score" />
      </a>
      <a href="https://meercode.io/pankod/superplate">
        <img src="https://meercode.io/badge/pankod/superplate?type=ci-success-rate&branch=master&token=2ZiT8YsoJgt57JB23NYwXrFY3rJHZboT&lastDay=31" alt="Meercode CI Success Rate" />
      </a>
      <a href="https://david-dm.org/pankod/superplate">
        <img src="https://david-dm.org/pankod/superplate/status.svg" alt="Dependencies Status" />
      </a>
      <a href="https://david-dm.org/pankod/superplate?type=dev">
        <img src="https://david-dm.org/pankod/superplate/dev-status.svg" alt="devDependencies Status" />
      </a>
      <a href="https://img.shields.io/npm/dw/@pankod/superplate">
        <img src="https://img.shields.io/npm/dw/@pankod/superplate" alt="npm" />
      </a>
    </div>
  )
}
function Feature({ imageUrl, title, url }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--2', styles.feature)}>
      <a href={url} target="_blank">
        {imgUrl && (
          <div className="text--center">
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </div>
        )}
        <h3 className={styles.featureTitle}>{title}</h3>
      </a>
    </div>
  );
}

function Sections() {
  return (
    <>
      <div className={styles.gettingStartedSection}>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--4 col--offset-1">
              <h2>All plugins has best practice</h2>
              <p>
                We have added all the <strong>best practices</strong> you need while creating your new project.
                superplate gives you many abilities to create your own plugin and interact with the others. 
                <br />
                <br />
                To create a project called <i>my-app</i>, run this command:
              </p>
              <CodeBlock className="language-sh">
                npx superplate my-app
              </CodeBlock>
              <br />
            </div>
            <div className="col col--5 col--offset-1">
              <img
                className={styles.sectionImage}
                alt="Easy to get started in seconds"
                src={
                  'https://user-images.githubusercontent.com/11361964/106468355-dd9be280-64ae-11eb-82da-c313beb16d6b.gif'
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--4 col--offset-1">
              <img
                className={styles.sectionImage}
                alt="Easy to update"
                src={useBaseUrl('img/code.svg')}
              />
            </div>
            <div className="col col--5 col--offset-1">
              <h2>Easy to extend/customize plugin structure</h2>
              <p>
                Kolay extend/customize edilebilir plugin yapısı
                superplate gives you many abilities to create your own plugin and interact with the others. 
              </p>
              <CodeBlock className="language-sh">
                npm run dev
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.logoContainer}>
            <img className={clsx(styles.heroBannerLogo, 'margin-vert--md')} src="img/superplate-logo.svg" alt="logo-icon" />
          </div>
          <img className={styles.heroTitle} src="img/superplate-text.svg" alt="logo-text" />
          <p className={clsx(styles.heroSubtitle, 'hero__subtitle')}>{siteConfig.tagline}</p>
          <Badges />
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {(features ?? []) && features.length > 0 && (
          <section className={styles.featuresContainer}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Sections />
    </Layout>
  );
}

export default Home;
