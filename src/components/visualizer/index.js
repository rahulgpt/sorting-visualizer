import React, { Component, createRef } from "react";
import { BubbleSort, QuickSort, SelectionSort, InsertionSort, HeapSort } from "../../algorithms";
import FlexWrapper from "../flex-wrapper.js";
import { Wrapper, Value, Bar, BarWrapper, Container, ScreenSizeWarning } from "./visualizer_components";
import { NavWrapper, Logo, NavElement, ResetIcon, StopIcon } from "./nav_components";
import { config } from "../../app_config";
import Drawer from "../drawer";
import ScreenOverlayImage from "../screen-overlay.svg";

class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.parentRef = createRef();
    }

    componentDidMount() {
        // Warning overlay
        if (window && (window.innerWidth < 875 || window.innerHeight < 624))
            document.getElementById("screen-size-overlay").style.display = "block";

        this.handleResetArray();

        let childNodes = this.parentRef.current.childNodes[0].childNodes;

        setTimeout(() => {
            for (let i = 0; i < childNodes.length; i++) {
                childNodes[i].style.transform = `translate(${i * 30}px)`;
                setTimeout(() => {
                    childNodes[i].style.transition = "0.2s transform ease";
                }, 100);
            }

            childNodes.forEach((node) => {
                node.style.visibility = "visible";
            });
        }, 10);

        document.addEventListener("keydown", (e) => {
            const { isRunning } = this;
            const { isDrawerOpen } = this.state;

            if (!isDrawerOpen) {
                if (e.key === "b" && !isRunning()) this.handleBubbleSort();
                if (e.key === "s" && !isRunning()) this.handleSelectionSort();
                if (e.key === "i" && !isRunning()) this.handleInsertionSort();
                if (e.key === "q" && !isRunning()) this.handleQuickSort();
                if (e.key === "h" && !isRunning()) this.handleHeapSort();
                if (e.key === "n" && !isRunning()) this.handleResetArray();
            } else {
                if (e.key === "b") this.setState({ algo: 0 });
                if (e.key === "s") this.setState({ algo: 1 });
                if (e.key === "i") this.setState({ algo: 2 });
                if (e.key === "q") this.setState({ algo: 3 });
                if (e.key === "h") this.setState({ algo: 4 });
            }

            if (e.key === "r") window.location.reload();
            if (e.key === "d") this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
        });
    }

    componentDidUpdate() {
        const { lock } = this;
        const { bubbleSort, selectionSort, insertionSort, quickSort, heapSort } = this.state;

        if (!this.state.lock) {
            bubbleSort && lock() && BubbleSort(() => this.handleBubbleSort());
            selectionSort && lock() && SelectionSort(() => this.handleSelectionSort());
            insertionSort && lock() && InsertionSort(() => this.handleInsertionSort());
            quickSort && lock() && QuickSort(() => this.handleQuickSort());
            heapSort && lock() && HeapSort(() => this.handleHeapSort());
        }

        // disable overflow with drawer
        if (this.state.isDrawerOpen) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "unset";
    }

    state = {
        array: [],
        bubbleSort: false,
        quickSort: false,
        selectionSort: false,
        insertionSort: false,
        heapSort: false,
        isDisabled: false,
        arrLength: 20,
        isDrawerOpen: false,
        lock: false,
        algo: 0,
    };

    handleResetArray = () => {
        const { baseColor } = config.common;
        const arr = [];
        for (let i = 0; i < this.state.arrLength; i++) {
            arr.push(randomIntFromInterval(15, 45));
        }
        this.setState({ array: arr });

        let container = document.getElementById("container");
        let blocks = container.childNodes;

        blocks.forEach((block) => (block.childNodes[1].style.backgroundColor = baseColor));
    };

    handleBubbleSort = () => {
        document.body.focus();
        this.setState({
            bubbleSort: !this.state.bubbleSort,
            isDisabled: !this.state.isDisabled,
            lock: false,
            algo: 0,
        });
    };

    handleQuickSort = () => {
        document.body.focus();
        this.setState({
            quickSort: !this.state.quickSort,
            isDisabled: !this.state.isDisabled,
            lock: false,
            algo: 3,
        });
    };

    handleSelectionSort = () => {
        document.body.focus();
        this.setState({
            selectionSort: !this.state.selectionSort,
            isDisabled: !this.state.isDisabled,
            lock: false,
            algo: 1,
        });
    };

    handleInsertionSort = () => {
        document.body.focus();
        this.setState({
            insertionSort: !this.state.insertionSort,
            isDisabled: !this.state.isDisabled,
            lock: false,
            algo: 2,
        });
    };

    handleHeapSort = () => {
        document.body.focus();
        this.setState({
            heapSort: !this.state.heapSort,
            isDisabled: !this.state.isDisabled,
            lock: false,
            algo: 4,
        });
    };

    isRunning = () => {
        return (
            this.state.bubbleSort ||
            this.state.selectionSort ||
            this.state.quickSort ||
            this.state.insertionSort ||
            this.state.heapSort
        );
    };

    lock = () => {
        // lock will be released in repective handler functions
        this.setState({ lock: true });
        return true;
    };

    render() {
        const { isDisabled } = this.state;

        return (
            <React.Fragment>
                <ScreenSizeWarningOverlay />
                <NavWrapper>
                    <FlexWrapper justifyContent="space-between">
                        <Logo onClick={() => window.location.reload()}>
                            &lt; Sorting Visualizer /&gt;
                        </Logo>

                        <FlexWrapper gap="1.5rem">
                            <StopIcon title="stop" onClick={() => window.location.reload()} />
                            {isDisabled ? (
                                <ResetIcon
                                    size={30}
                                    disabled={isDisabled}
                                    color={"#FFE5E5"}
                                    title="reset"
                                />
                            ) : (
                                <ResetIcon
                                    size={30}
                                    color={"white"}
                                    disabled={isDisabled}
                                    onClick={this.handleResetArray}
                                    title="reset"
                                />
                            )}
                        </FlexWrapper>
                    </FlexWrapper>
                    <FlexWrapper justifyContent="space-between" margin="2.5rem 0 0 0">
                        <FlexWrapper justifyContent="flex-start">
                            <NavElement disabled={this.state.isDisabled} onClick={this.handleBubbleSort}>
                                Bubble Sort
                            </NavElement>
                            <NavElement disabled={isDisabled} onClick={this.handleSelectionSort}>
                                Selection Sort
                            </NavElement>
                            <NavElement disabled={isDisabled} onClick={this.handleInsertionSort}>
                                Insertion Sort
                            </NavElement>
                            <NavElement disabled={isDisabled} onClick={this.handleQuickSort}>
                                Quick Sort
                            </NavElement>
                            <NavElement disabled={isDisabled} onClick={this.handleHeapSort}>
                                Heap Sort
                            </NavElement>
                        </FlexWrapper>
                    </FlexWrapper>
                </NavWrapper>

                <Wrapper ref={this.parentRef} id="wrapper">
                    <Container length={this.state.arrLength} id="container">
                        {this.state.array.map((value, idx) => (
                            <BarWrapper key={idx} idx={idx} style={{ visibility: "hidden" }}>
                                <Value>{value}</Value>
                                <Bar className="array-bar" height={value} width={12} />
                            </BarWrapper>
                        ))}
                    </Container>
                    <Drawer
                        isOpen={this.state.isDrawerOpen}
                        toggleDrawer={() =>
                            this.setState({ ...this.state, isDrawerOpen: !this.state.isDrawerOpen })
                        }
                        algo={this.state.algo}
                    />
                </Wrapper>
            </React.Fragment>
        );
    }
}

const ScreenSizeWarningOverlay = () => (
    <ScreenSizeWarning id="screen-size-overlay">
        <FlexWrapper style={{ flexDirection: "column" }} gap="1rem">
            <img src={ScreenOverlayImage} alt="" />
            <p style={{ color: "#c7c9ca", lineHeight: "1.5rem" }}>
                This app is not suitable for small screen sizes. The minimun screen size required is "876
                x 624" pixels.
            </p>
            <p
                style={{
                    color: "#efefef",
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                    cursor: "pointer",
                }}
                onClick={() => (document.getElementById("screen-size-overlay").style.display = "none")}
            >
                Continue anyway!
            </p>
        </FlexWrapper>
    </ScreenSizeWarning>
);

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} random number between the range
 */
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default Visualizer;
