import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import Loader from './Loader';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from '../components';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Globale Krypto-Statistiken</Title>
      <Row>
        <Col span={12}><Statistic title="Kryptowährungen Insgesamt" value={globalStats.total}></Statistic></Col>
        <Col span={12}><Statistic title="Gesamter Austausch" value={millify(globalStats.totalExchanges)}></Statistic></Col>
        <Col span={12}><Statistic title="Gesamtmarktkapitalisierung" value={`$${millify(globalStats.totalMarketCap)}`}></Statistic></Col>
        <Col span={12}><Statistic title="24-Stunden-Gesamtvolumen" value={`$${millify(globalStats.total24hVolume)}`}></Statistic></Col>
        <Col span={12}><Statistic title="Gesamtmärkte" value={millify(globalStats.totalMarkets)}></Statistic></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Kryptowährungen</Title>
        <Title level={2} className="show-more"><Link to="/cryptocurrencies">Mehr Anzeigen</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Neusten Nachrichten</Title>
        <Title level={3}><Link to="/news">Mehr Anzeigen</Link></Title>
      </div>
      <News simplified/>

    </>
  )
}

export default Homepage;