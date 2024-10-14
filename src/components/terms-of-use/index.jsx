import { getTermsofUseContent } from "@/services/terms-of-use";
import { logError, renderNode } from "@/utils/utilityFunctions";

export default async function TermsOfUse() {

    try {
        const content = await getTermsofUseContent();
        const nodes = content.nodes;
    
        return (
            <section className="section-terms-and-policy">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-11 offset-lg-3 mx-mobile-auto">
                            {nodes[0].nodes && (<h1 className="title split-words" data-aos="d:loop">
                                {nodes[0].nodes[0].textData.text}
                            </h1>)}
                            <div
                                className="editor mt-lg-50 mt-mobile-30"
                                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                                {nodes.slice(1).map((node) => (
                                    <div key={node.id}>{renderNode(node)}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } catch (error) {
        logError("Error fetching Terms of Use page data:", error);
    }
}