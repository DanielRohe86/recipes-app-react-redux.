import PropTypes from 'prop-types';
import { useMemo } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const contextValue = useMemo(() => ({
    name: 'dasd',
  }));

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
