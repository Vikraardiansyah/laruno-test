import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Check from '../assets/check.gif';

const convertToRupiah = angka => {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
  return (
    'Rp. ' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
};

const Detail = ({ location, history }) => {
  const { detail, nama } = location.state;
  if (location.state) {
    console.log(location.state.detail);
    return (
      <>
        <Navbar detail={true} />
        <Container
          fluid='md'
          style={{ paddingTop: '20px', paddingBottom: '50px' }}
        >
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Thank you {nama}!
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Check} style={{ width: '100px' }} />
          </div>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            {detail.map(dataCosts => (
              <Col md={6}>
                <h4 style={{ textAlign: 'center' }}>
                  {dataCosts.code.toUpperCase()}
                </h4>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Deskripsi</th>
                      <th>Tarif</th>
                      <th>Estimasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCosts.costs.map(data => (
                      <tr>
                        <th>{data.service}</th>
                        <td>{data.description}</td>
                        <td>{convertToRupiah(data.cost[0].value)}</td>
                        <td>{data.cost[0].etd.split(' ')[0]} Hari</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </>
    );
  } else {
    history.push('/');
    return <></>;
  }
};

export default Detail;
