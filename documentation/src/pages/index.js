import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { features } from '../features';
import styles from './styles.module.css';


// [![dev-dependencies Status](https://travis-ci.org/pankod/superplate.svg?branch=master)](https://travis-ci.org/pankod/superplate) 

// ![npm](https://img.shields.io/npm/dw/@pankod/superplate)

function Badges() {
  return (
    <div className={styles.topBadges}>
      <a href="https://meercode.io/pankod/superplate">
        <img src="https://api.meercode.io/badge/pankod/superplate?type=ci-score&token=IITTyA0OnDnR3phwZbp61uZW9QO05lxQ&lastDay=14" alt="Meercode CI Score" />
      </a>
      <a href="https://meercode.io/pankod/superplate">
        <img src="https://api.meercode.io/badge/pankod/superplate?type=ci-success-rate&token=IITTyA0OnDnR3phwZbp61uZW9QO05lxQ&lastDay=14" alt="Meercode CI Success Rate" />
      </a>
      <a href="https://david-dm.org/pankod/superplate">
        <img src="https://david-dm.org/pankod/superplate/status.svg" alt="Dependencies Status" />
      </a>
      <a href="https://david-dm.org/pankod/superplate?type=dev">
        <img src="https://david-dm.org/pankod/superplate/dev-status.svg" alt="devDependencies Status" />
      </a>
      <a href="https://travis-ci.org/pankod/superplate">
        <img src="https://travis-ci.org/pankod/superplate.svg?branch=master" alt="devDependency Status" />
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
          <section>
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
    </Layout>
  );
}

export default Home;
