import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled(motion.h2)`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const ChartContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const TableContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TableRow = styled(motion.tr)`
  &:nth-child(even) {
    background-color: #f8fafc;
  }
  
  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const ErrorContainer = styled(motion.div)`
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #e53e3e;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ChartImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

function ChangePoints() {
  const [changePoints, setChangePoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/change_points')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        setChangePoints(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Container>
      <Header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Detected Change Points
      </Header>
      <LoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <LoadingSpinner />
        <p style={{ marginTop: '1rem', color: '#4a5568' }}>Analyzing data patterns...</p>
      </LoadingContainer>
    </Container>
  );

  if (error) return (
    <Container>
      <Header>Detected Change Points</Header>
      <ErrorContainer
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 style={{ marginTop: 0 }}>Error Loading Data</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            marginTop: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </ErrorContainer>
    </Container>
  );

  return (
    <Container>
      <Header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Detected Change Points
      </Header>
      
      <ChartContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ChartImage
          src="/api/plot"
          alt="Price with Change Points"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </ChartContainer>
      
      <TableContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Change Point Date</TableHeaderCell>
              <TableHeaderCell>Event Date</TableHeaderCell>
              <TableHeaderCell>Event Description</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {changePoints.map((cp, index) => (
              <TableRow
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <TableCell>{cp.Change_Point_Date}</TableCell>
                <TableCell>{cp.Event_Date ? cp.Event_Date : 'N/A'}</TableCell>
                <TableCell>{cp.Event_Description || 'No description available'}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ChangePoints;