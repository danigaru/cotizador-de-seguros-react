import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ContenedorHeader = styled.div`
  background-color: #26c6da;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
`;

const TextoHeader = styled.h1`
  font-size: 2rem;
  font-family: "Slabo 27px", serif;
  text-align: center;
  margin: 0;
`;

const Header = ({ title }) => {
  return (
    <ContenedorHeader>
      <TextoHeader>{title}</TextoHeader>
    </ContenedorHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
