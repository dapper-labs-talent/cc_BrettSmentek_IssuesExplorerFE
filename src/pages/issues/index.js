import { useContext, useState } from "react";
import styled from "styled-components";
import { IssuesContext } from "../../App";

function Issues() {
  const { issues } = useContext(IssuesContext);

  return <div>{JSON.stringify(issues)}</div>;
}

export default Issues;
