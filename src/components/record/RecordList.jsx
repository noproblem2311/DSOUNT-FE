import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/videos/');
        setRecords(response.data);
      } catch (error) {
        console.error('There was an error fetching the records:', error);
      }
    };

    fetchRecords();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = records.filter(record =>
    record.transcript.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/record/${id}`);
  };

  return (
    <div className="site-card-wrapper" style={{ margin: '20px' }}>
      <div style={{ margin: '20px 0' }}>
        <Input placeholder="Search transcripts..." onChange={handleSearchChange} />
      </div>
      <Row gutter={[16, 16]}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={record.id}>
              <Card
                hoverable
                onClick={() => handleCardClick(record.id)}
                cover={<img alt="example" src='/images/theme.jpg' style={{ width: '100%', height: 'auto' }} />}
              >
                <Card.Meta title={`Video uploaded on ${record.upload_time}`} description={`${record.transcript.substring(0, 100)}...`} />
                <br />
                <Link to={`/record/${record.id}`}>View Details</Link>
              </Card>
            </Col>
          ))
        ) : (
          <div>No records found.</div>
        )}
      </Row>
    </div>
  );
};

export default RecordList;
