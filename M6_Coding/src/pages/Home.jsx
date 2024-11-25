import { Outlet } from 'react-router-dom'

export default function Home() {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
    },
    main: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      width: '100%'
    }
  }

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
