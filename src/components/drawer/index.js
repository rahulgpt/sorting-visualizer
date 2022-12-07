import React from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { bubble, selection, insertion, quick } from "./implementation";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiArrowLeftSLine } from "react-icons/ri";

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: ${(p) => (p.isOpen ? 0.5 : 0)};
    visibility: ${(p) => (p.isOpen ? "unset" : "hidden")};
    transition: all 0.3s;
`;

const DrawArea = styled.div`
    padding: 1rem 1.5rem;
    width: 450px;
    height: 100vh;
    background-color: #1b1b1b;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 5;
    transform: ${(p) => (p.isOpen ? "translateX(0%)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
    color: #c7c9ca;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

const KBD = styled.div`
    background-color: #f8f9fa;
    padding: 0.2rem;
    color: #495057;
    border-radius: 5px;
    min-width: 23px;
    display: flex;
    justify-content: center;
    border: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    font-weight: 600;
    font-size: 0.9rem;
`;

const Code = styled(SyntaxHighlighter)`
    font-size: 0.9rem !important;
    letter-spacing: 0.8px;
    /* max-height: 36vh; */
    flex-grow: 1;
`;

const Tip = styled.p`
    font-size: 0.8rem;
    margin: 0.2rem 0;
    line-height: 18px;
`;

const DrawerToggle = styled.div`
    background-color: #1b1b1b;
    position: absolute;
    left: -9.3%;
    top: 50%;
    border-radius: 50% 0 0 50%;
    padding: 0.3rem;
    box-shadow: ${(p) => (p.isOpen ? "none" : "0px 2px 2px 1px rgba(0, 0, 0, 0.5)")};
    cursor: pointer;
`;

const DrawerIcon = styled(RiArrowLeftSLine)`
    color: #fff;
    font-size: 2rem;
    transform: ${(p) => (p.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

const Drawer = ({ toggleDrawer, isOpen, algo }) => {
    const colorDescLookupCommon = [
        { color: "#cb6bf9", value: "Unsorted" },
        { color: "#952AC7", value: "Comparing" },
        { color: "#77DD77", value: "Sorted" },
    ];

    const colorDescSpecific = {
        selection: [{ color: "#D291BC", value: "Lowest Element" }],
        quick: [
            { color: "#bbbdda", value: "Pivot" },
            { color: "#D291BC", value: "Less than Pivot" },
        ],
        heap: [{ color: "#D291BC", value: "Largest Element" }],
    };

    const colorDescSpecificLookup = [
        ,
        colorDescSpecific.selection,
        ,
        colorDescSpecific.quick,
        colorDescSpecific.heap,
    ];

    const os = { windows: 0, mac: 1 };
    // eslint-disable-next-line
    const osSpecificKey = ["Ctrl", "⌘"];
    // eslint-disable-next-line
    const userOs = navigator.userAgent.includes("Mac") ? os.mac : os.windows;

    const hotKeyLookup = [
        { key: "B", value: "Bubble Sort" },
        { key: "S", value: "Selection Sort" },
        { key: "I", value: "Insertion Sort" },
        { key: "Q", value: "Quick Sort" },
        { key: "H", value: "Heap Sort" },
        { key: "N", value: "Reset Array" },
        { key: "R", value: "Stop Sorting" },
        { key: "D", value: "Toggle Drawer" },
    ];

    const algoLookup = [bubble, selection, insertion, quick, quick];

    return (
        <>
            <Background onClick={toggleDrawer} isOpen={isOpen} />
            <DrawArea isOpen={isOpen}>
                <DrawerToggle isOpen={isOpen} onClick={toggleDrawer}>
                    <DrawerIcon isOpen={isOpen} />
                </DrawerToggle>
                <Tip>
                    <BsFillInfoCircleFill style={{ marginRight: "0.5rem" }} />
                    While the drawer is open, press the algorithm's hotkey to change the description
                </Tip>
                <h3>Color Description</h3>
                <Row>
                    {colorDescLookupCommon.map((el) => (
                        <ColorDescription
                            color={el.color}
                            description={el.value}
                            key={Math.random() % 100}
                        />
                    ))}
                    {colorDescSpecificLookup[algo]?.map((el) => (
                        <ColorDescription
                            color={el.color}
                            description={el.value}
                            key={Math.random() % 100}
                        />
                    ))}
                </Row>

                <h3>Implementation</h3>
                <Code language="javascript" style={vscDarkPlus} wrapLongLines>
                    {algoLookup[algo].trim()}
                </Code>

                <h3>Hot Keys</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    {hotKeyLookup.map((el) => (
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                            key={Math.random() % 100}
                        >
                            {/* <kbd>{el.key}</kbd> */}
                            {el.key.split("+").map((el) => (
                                <KBD key={Math.random() % 100}>{el}</KBD>
                            ))}
                            <p>{el.value}</p>
                        </div>
                    ))}
                </div>
            </DrawArea>
        </>
    );
};

const ColorDot = styled.div`
    height: 13px;
    width: 13px;
    background-color: ${(p) => p.color || "#fff"};
    border-radius: 50%;
`;

const ColorDescriptionWrapper = styled.div`
    display: flex;
    justify-content: center;
    color: #c7c9ca;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;

    p {
        margin: 0.5rem 0;
    }
`;

const ColorDescription = ({ color, description }) => (
    <ColorDescriptionWrapper>
        <ColorDot color={color} />
        <p>{description}</p>
    </ColorDescriptionWrapper>
);

export default Drawer;
