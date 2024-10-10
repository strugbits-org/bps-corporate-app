import React from "react";

const FormConcept = ({data}) => {

  return (
    <section className="home-from-concept-to-reality overflow-hidden">
      <div
        className="container-frame-by-frame"
        data-sticky
        data-trigger="parent"
      ></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 column-1">
            <h2
              className="title"
              data-sticky
              data-trigger=".home-from-concept-to-reality"
              data-start="38% bottom"
              data-end="60% 100%"
            >
              <div data-parallax data-translate-y="-35vh">
                {data.text1}
              </div>
            </h2>
            <h2
              className="title text-right"
              data-sticky
              data-trigger=".home-from-concept-to-reality"
              data-start="70% bottom"
              data-end="bottom bottom"
            >
              <div data-translate-y="-20vh" data-parallax>
                {data.text2}
              </div>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormConcept;
