import { styled } from "styled-components";

export const Styled = styled.div`
    height: 100%;
    .filter-bar{
        margin: 20px 20px 0px;
        button{
            margin-right: 5px;
            border: solid 1px #0958d9;
            background: unset;
            color: #0958d9;
            font-weight: 600;
            &:nth-child(1){
                margin-right:5px;
            }
            &.active{
                background: #0958d9;
                color: #fff;
            }
        }
    }
    ._table{
        width: 100%;
        height: 100%;
        padding: 20px;
        .head{
            display: flex;
            width: 100%;
            min-width: fit-content;
            /* border-bottom: solid 5px #ccc; */
            height: 32px;
            font-weight: 600;
            color: #333;
            padding-left: 10px;
            padding-right: 10px;
            .item{
                width: 25%;
                min-width: 150px;
            }
        }
        .data{
            display: flex;
            width: 100%;
            min-width: fit-content;
            margin: 3px 0px;
            padding: 10px;
            background: #eee;
            &:hover{
                background: #ccc;
            }
            .item{
                display: flex; 
                flex-direction: column;
                justify-content: center;
                width: 25%;
                min-width: 150px;
                .btn-bid{
                    width: 100px;
                }
            }
        }
    }
`;

export const BidModalStyled = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.75);
    top: 0;
    display: flex;
    justify-content: center;
    .group{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .content{
        width: 300px;
        height: 170px;
        margin-top: 50px;
        padding: 10px;
        border: solid 1px #eee;
        border-radius: 10px;
        background:#fff;
        box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.16);
        .title{
            font-weight: 600;
            color: #333;
            font-size: 14px;
            margin: 10px 0px;
        }
        .btn-group{
            margin-top: 25px;
            display: flex;
            justify-content: flex-end;
            button:nth-child(1){
                margin-right:5px;
            }
        }
        input.ierr{
            border-color: red;
            &:focus-visible{
                outline: none;
            }
        }
        .error{
            margin: 5px 0px;
            font-size: 12px;
            color: red;
        }
    }
`;