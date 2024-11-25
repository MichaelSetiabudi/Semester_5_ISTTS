import { useRouteError, Link } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5'
    },
    content: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '400px'
    },
    heading: {
      color: '#f85532',
      marginBottom: '1rem'
    },
    button: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#f85532',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      marginTop: '1rem'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p><i>{error.statusText || error.message}</i></p>
        <Link to="/" style={styles.button}>Back to Home</Link>
      </div>
    </div>
  )
}