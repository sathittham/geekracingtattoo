import styled from 'styled-components';

const UbNewParcelWrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    overflow: auto;
    //border: 1px solid #d8d8d8;
    padding: 20px 20px 20px 15px;
    margin-bottom : 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    

    .ubNewParcelFormWrapper{
        width: 100%;
        height: auto;
        background-color: white;
        //padding: 20px 20px 20px 15px;
        //margin-bottom : 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;

        @media only screen and (max-width: 600px) {
            /* For mobile phones: */
            flex-direction: column;
            align-items: flex-start;
          }
        
          @media only screen and (max-width: 767px) {
            /* For tablets: */
            flex-direction: column;
            align-items: flex-start;
          }
        
          @media only screen and (min-width: 767px) and (max-width: 990px) {
            /* For desktop: */
            flex-direction: row;
            align-items: flex-start;
          }
    }

    .ubParcelList{
        width: 100%;
        padding: 20px 0 20px 15px;
        overflow: hidden;
        margin: 0 0 15px;
        background: #ffffff;
        //border: 1px solid #d8d8d8;
        display: flex;
        align-items: flex-start;
    }

    .ubParcelNoWrapper {
        width: auto;
        display: flex;
        background-color: #fffff;
        // border: 1px solid #d8d8d8;
        // padding-right: 10px;
         align-items: start;
         justify-content: start;
        // margin-bottom: 10px;

        .ubParcelNoLabel{
            font-size:14px
            background-color: #eeeee;
        }


    }

    .ubParcelNoButton{
        cursor:pointer;
    }

    .ubParcelRoomWrapper {
        width: auto;
        display: flex;
        background-color: #fffff;
        // border: 1px solid #d8d8d8;
        // padding: 10px 0px 10px 10px;
        // padding-right: 10px;
        align-items: start;
        justify-content: start;
        // margin-bottom: 10px;

        .ubParcelRoomInput{
            font-size:14px
        }
    }

    .ubParcelInputWrapper {
        width: auto;
        display: flex;
        background-color: #fffff;
        // border: 1px solid #d8d8d8;
        //padding: 10px 10px 10px 10px;
        // padding-right: 10px;
        align-items: start;
        justify-content: start;
  
        .ubParcelInputInput{
            font-size:14px
        }

        Select{
            width:auto;
        }
    }

    .ubParcelIconWrapper {
        width: auto;
        display: flex;
        background-color: #fffff;
        // border: 1px solid #d8d8d8;
        // padding: 10px 0px 10px 10px;
        padding-right: 10px;
        align-items: center;
        justify-content: center;
        // margin-bottom: 10px;

        .ubParcelIconInput{
            font-size:18px
        }
    }
`

export default UbNewParcelWrapper;