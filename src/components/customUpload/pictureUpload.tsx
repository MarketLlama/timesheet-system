import React from "react";

import defaultImage from "../../assets/img/default-avatar.png";

export interface PictureUploadProps {}

export interface PictureUploadState {
    file: File | null;
    imagePreviewUrl: string;
}

class PictureUpload extends React.Component<PictureUploadProps, PictureUploadState> {
    constructor(props: PictureUploadProps) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: defaultImage,
        };
    }
    public render() {
        return (
            <div className="picture-container">
                <div className="picture">
                    <img
                        src={this.state.imagePreviewUrl}
                        className="picture-src"
                        alt="..."
                    />
                    <input type="file" onChange={(e) => this._handleImageChange(e)} />
                </div>
                <h6 className="description">Choose Picture</h6>
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
}

export default PictureUpload;
