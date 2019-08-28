// used for making the prop types of this component
import PropTypes from "prop-types";
import React, { createRef } from "react";

// core components
import { Button } from "../../components/customButtons";

import defaultImage from "../../assets/img/image_placeholder.jpg";
import defaultAvatar from "../../assets/img/placeholder.jpg";

export interface ImageUploadProps {
    avatar: boolean;
    addButtonProps: any;
    changeButtonProps: any;
    removeButtonProps: any;
}

export interface ImageUploadState {
    file: File | null;
    imagePreviewUrl: string;
}

class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
    private _fileInput = createRef<HTMLInputElement>();
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
        };

    }
    public render() {
        const {
            avatar,
            addButtonProps,
            changeButtonProps,
            removeButtonProps,
        } = this.props;
        return (
            <div className="fileinput text-center">
                <input type="file" onChange={this._handleImageChange} ref={this._fileInput} />
                <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                    <img src={this.state.imagePreviewUrl} alt="..." />
                </div>
                <div>
                    {this.state.file === null ? (
                        <Button {...addButtonProps} onClick={() => this._handleClick()}>
                            {avatar ? "Add Photo" : "Select image"}
                        </Button>
                    ) : (
                            <span>
                                <Button {...changeButtonProps} onClick={() => this._handleClick()}>
                                    Change
                                </Button>
                                {avatar ? <br /> : null}
                                <Button
                                    {...removeButtonProps}
                                    onClick={() => this._handleRemove()}
                                >
                                    <i className="fas fa-times" /> Remove
                                </Button>
                            </span>
                        )}
                </div>
            </div>
        );
    }
    private _handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file: File = e.target.files[0] as File;
        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result as string,
            });
        };
        reader.readAsDataURL(file);
    }
    private _handleSubmit = (e) => {
        e.preventDefault();
        // this.state.file is the file/image uploaded
        // in this function you can save the image (this.state.file) on form submit
        // you have to call it yourself
    }
    private _handleClick = () => {
        if (this._fileInput.current) {
            this._fileInput.current.click();
        }
    }
    private _handleRemove = () => {
        this.setState({
            file: null,
            imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
        });
        if (this._fileInput.current) { this._fileInput.current.value = ""; }
    }
}

(ImageUpload as React.ComponentClass<ImageUploadProps>).propTypes = {
    avatar: PropTypes.bool,
    addButtonProps: PropTypes.object,
    changeButtonProps: PropTypes.object,
    removeButtonProps: PropTypes.object,
  } as any;

export default ImageUpload;
