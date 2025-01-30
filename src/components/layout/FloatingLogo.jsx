import logo from '/assets/TECH TITANS.png'

export const FloatingLogo = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      padding: '10px',
      backgroundColor: 'rgba(11, 64, 38, 0.4)',
      borderRadius: '8px'
    }}>
      <img 
        src={logo} 
        alt="Logo TechTitans" 
        style={{
          width: '70px',
          height: '70px',
          objectFit: 'contain'
        }}
      />
    </div>
  )
} 