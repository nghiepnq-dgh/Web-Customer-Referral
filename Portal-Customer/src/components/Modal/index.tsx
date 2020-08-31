import React from 'react';
import { Modal, Card } from 'antd';
import { ModalProps } from 'antd/es/modal/Modal';

interface CustomModalProps extends ModalProps {
  beforeShow?: Function;
  beforeHide?: Function;
}

export default function withModal(
  WrappedComponent: React.FC,
  options: CustomModalProps,
) {
  //   const Component = class extends React.Component<CustomModalProps> {
  //     state = {
  //       isVisible: false,
  //       isReady: false
  //     }

  //     show = async () => {
  //       this.setState({ isVisible: false });
  //       if (typeof this.props.beforeShow === 'function') {
  //         await this.props.beforeShow();
  //       }
  //       this.setState({ isVisible: true });
  //     }

  //     hide = async () => {
  //       if (typeof this.props.beforeHide === 'function') {
  //         await this.props.beforeHide();
  //       }
  //       this.setState({ isVisible: false });
  //     }

  //     componentDidMount() {
  //       this.setState({ isReady: true });
  //     }

  //     render() {
  //       return (
  //         <Modal
  //           {...this.props}
  //           visible={this.state.isVisible}
  //         >
  //           <Card loading={!this.state.isReady}>
  //             <WrappedComponent />
  //           </Card>
  //         </Modal>
  //       )
  //     }
  // }

  const render = () => {
    <Modal {...options} visible={visible}>
      <Card loading={loading}>
        <WrappedComponent />
      </Card>
    </Modal>;
  };

  let visible = false;
  let loading = false;

  const show = async () => {
    visible = false;
    if (typeof options.beforeShow === 'function') {
      await options.beforeShow();
    }
    visible = true;
    render();
  };

  const hide = async () => {
    if (typeof options.beforeHide === 'function') {
      await options.beforeHide();
    }
    render();
  };

  return {
    show,
    hide,
  };
}
