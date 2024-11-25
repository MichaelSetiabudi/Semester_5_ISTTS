import { Link } from 'react-router-dom'

export default function BuyerDashboard() {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      backgroundColor: '#f85532',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    content: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      color: '#f85532',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Buyer Dashboard</h1>
        <Link to="/" style={styles.button}>Logout</Link>
      </div>
      <div style={styles.content}>
        <h2>Welcome, Buyer!</h2>
        <p>Start shopping!</p>
      </div>
    </div>
  )
}
