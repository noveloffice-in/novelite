import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import whiteLogo from 'src/assets/images/logos/white-Logo.png';
import blackLogo from 'src/assets/images/logos/black-Logo.png';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
    cursor: 'default'
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {customizer.activeMode === 'dark' ? (
        <img src={whiteLogo} alt="Logo" style={{ height: '36px', marginLeft:'0.2rem'}}/>
          // <LogoLight />
        ) : (
          // <LogoDark />
          <img src={blackLogo} alt="Logo" style={{ height: '36px', marginLeft:'0.2rem'}}/>
          )}
      </LinkStyled>
    );
  }
  return (
    <LinkStyled style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {customizer.activeMode === 'dark' ? (
      <img src={blackLogo} alt="Logo" style={{ height: '36px', marginLeft:'0.2rem'}}/>
      // <LogoDarkRTL />
      ) : (
        <img src={blackLogo} alt="Logo" style={{ height: '36px', marginLeft:'0.2rem'}}/>
        // <LogoLightRTL />
      )}
    </LinkStyled>
  );
};

export default Logo;
