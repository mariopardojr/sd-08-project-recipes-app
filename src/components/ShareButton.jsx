import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShareIcon from '../images/shareIcon.svg';

function ShareButton({ type, id }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setCopied(true);
  };

  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ handleClick }>
        <img src={ ShareIcon } alt="share" />
      </button>
      { copied && 'Link copiado!' }
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareButton;
