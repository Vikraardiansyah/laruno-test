import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import qs from 'querystring';
import axios from 'axios';
import Select from 'react-select';
import ReactPlayer from 'react-player';
import DeliveryHeader from '../assets/delivery-headers.jpg';
import Loading from '../assets/loading.svg';

const App = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const getCity = async () => {
      const { data } = await axios.get(
        'https://murmuring-atoll-60712.herokuapp.com/city'
      );
      const dataCity = data.rajaongkir.results.map(data => {
        return {
          value: data.city_id,
          label: `${data.type} ${data.city_name}`,
        };
      });
      setDataCity(dataCity);
    };
    getCity();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmit(true);
    setLoading(true);
    if (nama && email && noHp && alamat) {
      try {
        const costPos = await axios.post(
          'https://murmuring-atoll-60712.herokuapp.com/cost',
          qs.stringify({
            origin: 456,
            destination: alamat,
            weight: 1000,
            courier: 'pos',
          })
        );
        const costTiki = await axios.post(
          'https://murmuring-atoll-60712.herokuapp.com/cost',
          qs.stringify({
            origin: 456,
            destination: alamat,
            weight: 1000,
            courier: 'tiki',
          })
        );
        const costJne = await axios.post(
          'https://murmuring-atoll-60712.herokuapp.com/cost',
          qs.stringify({
            origin: 456,
            destination: alamat,
            weight: 1000,
            courier: 'jne',
          })
        );

        await history.push({
          pathname: '/detail',
          state: {
            detail: [
              costPos.data.rajaongkir.results[0],
              costTiki.data.rajaongkir.results[0],
              costJne.data.rajaongkir.results[0],
            ],
            nama,
          },
        });
        setLoading(false);
      } catch (error) {
        console.log({ error });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <img
        src={DeliveryHeader}
        alt='delivery-headers'
        style={{ width: '100%' }}
      />
      <Container
        fluid='md'
        style={{ paddingTop: '30px', paddingBottom: '150px' }}
      >
        <Row>
          <Col
            md={5}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <ReactPlayer
              height='250px'
              url='https://www.youtube.com/watch?v=P6QmfYRQT9k'
            />
          </Col>
          <Col md={1} />
          <Col
            md={6}
            style={{
              marginBottom: '30px',
            }}
          >
            <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Form Data Diri
            </h4>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for='nama'>Nama</Label>
                <Input
                  type='text'
                  name='nama'
                  id='nama'
                  placeholder='Nama'
                  onChange={e => setNama(e.target.value)}
                  style={{
                    background: submit && !nama ? '#ef9a9a' : 'white',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    background: submit && !email ? '#ef9a9a' : 'white',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='noHp'>No HP</Label>
                <Input
                  type='number'
                  name='noHp'
                  id='noHp'
                  placeholder='No HP'
                  onChange={e => setNoHp(e.target.value)}
                  style={{
                    background: submit && !noHp ? '#ef9a9a' : 'white',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='alamat'>Alamat</Label>
                <Select
                  id='alamat'
                  nama='alamat'
                  placeholder='Pilih alamat'
                  options={dataCity}
                  onChange={value => setAlamat(value.value)}
                  styles={{
                    valueContainer: provided => ({
                      ...provided,
                      background: submit && !alamat ? '#ef9a9a' : 'white',
                    }),
                    dropdownIndicator: provided => ({
                      ...provided,
                      background: submit && !alamat ? '#ef9a9a' : 'white',
                    }),
                    placeholder: provided => ({
                      ...provided,
                      color: '#c7c7c7',
                    }),
                  }}
                />
              </FormGroup>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  className='button-submit'
                  disabled={loading || !(nama && email && noHp && alamat)}
                  style={{ background: '#b71c1c', borderColor: '#b71c1c' }}
                >
                  {loading ? (
                    <img
                      src={Loading}
                      alt='loading'
                      style={{
                        background: 'transparent',
                        width: '20px',
                        margin: '-5px 5px 0 0',
                      }}
                    />
                  ) : null}
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Col md='6'>
            <h2 style={{ textAlign: 'center' }}>Tentang Kami</h2>
            <p style={{ textAlign: 'justify' }}>
              Laruno adalah salah satu perusahaan internet terbesar di Indonesia
              yang menjual produk pembelajaran digital di Indonesia dan menjadi
              narasumber beberapa media besar Indonesia.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default App;
