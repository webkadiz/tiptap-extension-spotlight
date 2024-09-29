import styled from "styled-components"

const SpotlightListContainer = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 330px;
  max-height: 300px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0px 12px 32px rgba(2, 13, 76, 0.15),
    0px 2px 7px rgba(2, 13, 76, 0.14), 0px 1px 2px rgba(2, 13, 76, 0.1);
  border-radius: 4px;
`

const SpotlightListItem = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  padding: 8px 12px;
  width: 100%;
  color: #212121;
  fill: #212121;
  transition: 0.3s;

  &.is-selected {
    background-color: #f4f5f7;
  }

  &:hover {
    background-color: #f4f5f7;
  }
`

const SpotlightListItemLeft = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`

const SpotlightListItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const SpotlightDivider = styled.div`
  position: relative;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  margin: 4px 0;
`

const SpotlightDividerLine = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 50%;
  height: 1px;
  width: 100%;
  background: rgba(5, 5, 5, 0.06);
`

const SpotlightDividerText = styled.div`
  position: relative;
  display: inline-block;
  padding-left: 12px;
  padding-right: 12px;
  background: white;
  margin-left: 16px;
  z-index: 2;
  font-weight: bold;
  line-height: 1.5;
`

export const Styled = {
  SpotlightListContainer,
  SpotlightListItem,
  SpotlightListItemLeft,
  SpotlightListItemRight,
  SpotlightDivider,
  SpotlightDividerLine,
  SpotlightDividerText,
}
