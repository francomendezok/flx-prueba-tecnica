import Nav from "./Nav"
import Tabla from "./Table"
import SearchBox from "./SearchBox"
import SelectStatus from "./SelectStatus"
import AddUserButton from "./AddUser"
import Label from "./Label"

function SearchAndFilter () {
    return (
        <div className="search-and-filter">
            <SearchBox></SearchBox>
            <SelectStatus></SelectStatus>
        </div>
    )
}

function InputDiv () {
    return (
        <div className="input-div">
            <SearchAndFilter></SearchAndFilter>
            <AddUserButton></AddUserButton>
        </div>
    )
}

function InnerContainer () {
    return (
        <div className="inner-container">
            <Label></Label>
            <InputDiv></InputDiv>
            <Tabla></Tabla>
        </div>
    )
}

export default function Container () {
    return (
        <div className="container">
            <Nav></Nav>
            <InnerContainer></InnerContainer>
        </div>
    )
}

