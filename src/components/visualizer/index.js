import React, { Component, createRef } from 'react';
import { BubbleSort, QuickSort, SelectionSort, InsertionSort, HeapSort } from '../../algorithms';
import FlexWrapper from '../flex-wrapper.js';
import { Wrapper, Value, Bar, BarWrapper, Container } from './visualizer_components';
import { NavWrapper, Logo, NavElement, ResetIcon } from './nav_components';
import { config } from '../../app_config';


class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.parentRef = createRef();
    }

    componentDidMount() {
        this.handleResetArray();

        let childNodes = this.parentRef.current.childNodes[0].childNodes;

        setTimeout(() => {
            for (let i = 0; i < childNodes.length; i++) {
                childNodes[i].style.transform = `translate(${i * 30}px)`;
                setTimeout(() => {
                    childNodes[i].style.transition = "0.2s transform ease";
                }, 100);
            }

            childNodes.forEach(node => {
                node.style.visibility = "visible";
            })
        }, 10);

        document.addEventListener('keydown', e => {
            const { isRunning } = this;
            if (e.key === 'b' && !isRunning()) this.handleBubbleSort();
            if (e.key === 's' && !isRunning()) this.handleSelectionSort();
            if (e.key === 'i' && !isRunning()) this.handleInsertionSort();
            if (e.key === 'q' && !isRunning()) this.handleQuickSort();
            if (e.key === 'h' && !isRunning()) this.handleHeapSort();
            if (e.key === 'n' && !isRunning()) this.handleResetArray();

            if (e.key === 'r') window.location.reload();
        })
    }

    componentDidUpdate() {
        this.state.bubbleSort && BubbleSort(() => this.handleBubbleSort());
        this.state.selectionSort && SelectionSort(() => this.handleSelectionSort());
        this.state.insertionSort && InsertionSort(() => this.handleInsertionSort());
        this.state.quickSort && QuickSort(() => this.handleQuickSort());
        this.state.heapSort && HeapSort(() => this.handleHeapSort());
    }

    state = {
        array: [],
        bubbleSort: false,
        quickSort: false,
        selectionSort: false,
        insertionSort: false,
        heapSort: false,
        isDisabled: false,
        arrLength: 20
    }

    handleResetArray = () => {
        const { baseColor } = config.common;
        const arr = [];
        for (let i = 0; i < this.state.arrLength; i++) {
            arr.push(randomIntFromInterval(15, 45));
        }
        this.setState({ array: arr });

        let container = document.getElementById('container');
        let blocks = container.childNodes;

        blocks.forEach(block => block.childNodes[1].style.backgroundColor = baseColor);
    }

    handleBubbleSort = () => {
        this.setState({
            bubbleSort: !this.state.bubbleSort,
            isDisabled: !this.state.isDisabled,
        })
    }

    handleQuickSort = () => {
        this.setState({
            quickSort: !this.state.quickSort,
            isDisabled: !this.state.isDisabled,
        })
    }

    handleSelectionSort = () => {
        this.setState({
            selectionSort: !this.state.selectionSort,
            isDisabled: !this.state.isDisabled,
        })
    }

    handleInsertionSort = () => {
        this.setState({
            insertionSort: !this.state.insertionSort,
            isDisabled: !this.state.isDisabled,
        })
    }

    handleHeapSort = () => {
        this.setState({
            heapSort: !this.state.heapSort,
            isDisabled: !this.state.isDisabled,
        })
    }

    isRunning = () => {
        return this.state.bubbleSort || this.state.selectionSort
            || this.state.quickSort || this.state.insertionSort
            || this.state.heapSort;
    }

    render() {
        const { isDisabled } = this.state;

        return (
            <React.Fragment>
                <NavWrapper>
                    <FlexWrapper justifyContent='space-between' >
                        <Logo onClick={() => window.location.reload()}>&lt; Sorting Visualizer /&gt;</Logo>

                        {isDisabled ? <ResetIcon size={30} disabled={isDisabled} color={'#FFE5E5'} />
                            : <ResetIcon size={30} color={'white'} disabled={isDisabled} onClick={this.handleResetArray} />}
                    </FlexWrapper>
                    <FlexWrapper justifyContent='space-between' margin='2.5rem 0 0 0'>
                        <FlexWrapper justifyContent='flex-start'>
                            <NavElement
                                disabled={this.state.isDisabled}
                                onClick={this.handleBubbleSort}>
                                Bubble Sort
                            </NavElement>
                            <NavElement
                                disabled={isDisabled}
                                onClick={this.handleSelectionSort}>
                                Selection Sort
                            </NavElement>
                            <NavElement
                                disabled={isDisabled}
                                onClick={this.handleInsertionSort}>
                                Insertion Sort
                            </NavElement>
                            <NavElement
                                disabled={isDisabled}
                                onClick={this.handleQuickSort}>
                                Quick Sort
                            </NavElement>
                            <NavElement
                                disabled={isDisabled}
                                onClick={this.handleHeapSort}>
                                Heap Sort
                            </NavElement>
                        </FlexWrapper>
                    </FlexWrapper>
                </NavWrapper>

                <Wrapper ref={this.parentRef} id="wrapper">
                    <Container length={this.state.arrLength} id="container">
                        {this.state.array.map((value, idx) => (
                            <BarWrapper key={idx} idx={idx} style={{ visibility: 'hidden' }}>
                                <Value>{value}</Value>
                                <Bar className="array-bar" height={value} width={12} />
                            </BarWrapper>
                        ))}
                    </Container>
                </Wrapper>
            </React.Fragment>
        );
    }
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} random number between the range
 */
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Visualizer;

