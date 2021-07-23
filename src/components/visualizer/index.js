import React, { Component, createRef } from 'react';
import animation from '../animations';
import { BubbleSort, QuickSort, SelectionSort, InsertionSort } from '../../algorithms';
import FlexWrapper from '../flex-wrapper.js';
import { Wrapper, Value, Bar, BarWrapper, Container } from './visualizer_components';
import {
    NavWrapper, Logo, NavElement, ResetIcon,
    VSlider,
} from './nav_components';
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


            // animation.stagger(
            //     childNodes,
            //     () => this.setState({ isDisabled: false })
            // );
        }, 10)
    }

    componentDidUpdate() {
        let blocks = this.parentRef.current.childNodes[0].childNodes;
        this.state.bubbleSort && BubbleSort(() => this.handleBubbleSort());
        this.state.quickSort && QuickSort(blocks);
        this.state.selectionSort && SelectionSort(() => this.handleSelectionSort());
        this.state.insertionSort && InsertionSort(() => this.handleInsertionSort());
    }

    state = {
        array: [],
        bubbleSort: false,
        quickSort: false,
        selectionSort: false,
        insertionSort: false,
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

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].childNodes[1].style.backgroundColor = baseColor;
        }
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

    // handleOnChange = (e, newValue) => {
    //     // this.setState({ sliderValue: newValue });
    //     this.handleResetArray(Math.floor(parseInt(newValue)));
    // }

    render() {
        const { isDisabled } = this.state;

        return (
            <React.Fragment>
                <NavWrapper>
                    <FlexWrapper justifyContent='space-between'>
                        <Logo onClick={() => window.location.reload()}>&lt; Sorting Visualizer /&gt;</Logo>

                        {isDisabled ? <ResetIcon size={30} disabled={isDisabled} color={'#FFE5E5'} />
                            : <ResetIcon size={30} color={'white'} disabled={isDisabled} onClick={this.handleResetArray} />}
                    </FlexWrapper>
                    <FlexWrapper justifyContent='flex-start' margin='2.5rem 0 0 0'>
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
                        <NavElement disabled={isDisabled}>Merge Sort</NavElement>
                        <NavElement disabled={isDisabled}>Radix Sort</NavElement>
                        <VSlider
                            key={`Slider-${this.state.sliderValue}`}
                            valueLabelDisplay="auto"
                            min={2} max={50}
                            aria-label="pretto slider"
                            defaultValue={20}
                        />
                    </FlexWrapper>
                </NavWrapper>

                <Wrapper ref={this.parentRef} id="wrapper">
                    <Container length={this.state.arrLength} id="container">
                        {this.state.array.map((value, idx) => (
                            <BarWrapper key={idx} idx={idx} style={{ visibility: 'visible' }}>
                                <Value>{value}</Value>
                                <Bar className="array-bar" height={value} />
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

