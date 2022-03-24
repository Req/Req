import styled from "styled-components";

const Desktop = styled.main`
  width: 100vw;
  height: 100vh;
  background: var(--desk);
  z-index: -3;
`;

const Menubar = styled.div`
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 30px;
  bottom: 0px;
  background: var(--gray);
  border-top: 1px solid hsl(0, 0%, 90%);
  display: flex;
  justify-content: space-between;
`;

const Start = styled.div`
  line-height: 23px;
  margin: 1px 1px 1px 2px;
  width: 80px;
  padding-left: 3px;
  display: inline-block;
  cursor: pointer;
  background: var(--gray);
`;

const Menu = styled.div`
  position: fixed;
  width: 340px;
  bottom: 30px;
`;

const Clock = styled.div`
  text-align: center;
  line-height: 23px;
  margin: 1px 1px 1px 2px;
  width: 80px;
  padding-left: 3px;
  display: inline-block;
  cursor: pointer;
  background: var(--gray);
`;

const ProgramList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 4px 0.8em;
`;

const ProgramListItem = styled.li`
  padding: 4px;
  cursor: pointer;
  border: 1.6px inset transparent;
  &:hover {
    border-color:var(--lightgray);
  }
`;

const WindowButton = styled.span`
  display: inline-block;
  font-size: 14px;
  height:26px;
  line-height: 23px;
  margin: 1px 2px;
  padding: 1px 4px;
  min-width: 100px;
`

const WindowContent = styled.div`
  max-width: 99vw;
  max-height: 80vh;
  min-height: 200px;
  min-width: 200px;
  height: 200px;
  width: 200px;
  position: fixed;
`;

const Windows = styled.div``;

export {
  Clock,
  Desktop,
  Menu,
  Menubar,
  ProgramList,
  ProgramListItem,
  Start,
  WindowButton,
  WindowContent,
  Windows,
};
