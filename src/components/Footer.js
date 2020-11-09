import React from 'react';
import {name as app_name, version as app_version}  from '../../package.json';

export default function Footer(props) {
  return (
    <footer className="footer--container">
      <div>
        <p>Application:{app_name} Version:{app_version}</p>
      </div>
    </footer>
  );
};