import { DefaultButton } from "../commonComponents/DefaultButton";

export const JobsSection = ({ jobslist, content }) => {
    return (
        <section className="careers-jobs-board pt-lg-140 pt-mobile-50">
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-lg-10 offset-lg-1 column-1">
                        <h2 className="fs--80 text-center split-words" data-aos="d:loop">{content.jobsListingTitle}</h2>
                        <ul className="list-jobs mt-50">
                            {jobslist.map((job) => {
                                return (
                                    <li key={job._id} className="list-item" data-aos="d:loop">
                                        <div className="wrapper-job">
                                            <div className="container-function">
                                                <h3 className="function">{job.title}</h3>
                                            </div>
                                            <div className="container-job-info">
                                                <div className="job-info">
                                                    <div className="local job-info-item">
                                                        <span className="description-1">{content.jobsBoardInfoLabelLocal}</span>
                                                        <span className="description-2">{job.local}</span>
                                                    </div>
                                                    <div className="job-type job-info-item">
                                                        <span className="description-1">{content.jobsBoardInfoLabelJobType}</span>
                                                        <span className="description-2">{job.type}</span>
                                                    </div>
                                                    <div className="pay job-info-item">
                                                        <span className="description-1">{content.jobsBoardInfoLabelPay}</span>
                                                        <span className="description-2">{job.pay}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container-btn-apply-now">
                                                <DefaultButton
                                                    customClasses={"btn-apply-now"}
                                                    showArrow={false}
                                                    data={{
                                                        label: content.jobsBoardApplyButtonLabel,
                                                        action: job.url
                                                    }}
                                                ></DefaultButton>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div> */}
                    <div className="col-lg-6 offset-lg-3 column-2 pb-lg-240 py-mobile-150">
                        <h2 className="fs--80 text-center split-words" data-aos="d:loop">{content.callToActionTitle}
                        </h2>
                        <DefaultButton
                            customClasses={"btn-large btn-blue mt-lg-55 mt-mobile-30"}
                            data={{
                                label: content.callToActionButtonLabel,
                                action: content.callToActionButtonAction
                            }}
                            attributes={{
                                "data-aos": "fadeIn - .3s, d:loop",
                                "data-cursor-style": "off",
                            }}
                        ></DefaultButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
