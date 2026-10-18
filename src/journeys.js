export const STAGES=[
{id:"idea",name:"Exploring an idea",short:"Idea",description:"Decide whether the problem and demand are real."},
{id:"planning",name:"Planning the business",short:"Planning",description:"Turn the opportunity into a testable model."},
{id:"setup",name:"Setting up",short:"Setup",description:"Prepare the legal, financial and operating basics."},
{id:"launch",name:"Ready to launch",short:"Launch",description:"Prepare a clear offer and get the first customers."},
{id:"operating",name:"Already operating",short:"Operating",description:"Improve systems, margins and customer experience."},
{id:"scaling",name:"Ready to scale",short:"Scaling",description:"Expand repeatably without losing control."}
];
export const INDUSTRIES=[
{id:"service",name:"Services & professional"},
{id:"tourism",name:"Tourism & hospitality"},
{id:"retail",name:"Retail & online stores"},
{id:"food",name:"Food & beverage"},
{id:"technology",name:"Technology & digital"},
{id:"manufacturing",name:"Manufacturing & production"},
{id:"other",name:"Other / mixed"}
];
export const GOALS=[
{id:"validate",name:"Validate the business opportunity"},
{id:"customers",name:"Find or retain customers"},
{id:"funding",name:"Prepare for funding"},
{id:"finance",name:"Improve pricing and profitability"},
{id:"digital",name:"Improve online presence"},
{id:"operations",name:"Improve business operations"}
];
export const ADVISOR_MODES=[
{id:"assessment",name:"Assess my business",hint:"Assess evidence, risks and the next practical test."},
{id:"challenge",name:"Challenge assumptions",hint:"Identify what could make this plan fail."},
{id:"roadmap",name:"Prioritize next steps",hint:"Get three actions, ordered by evidence and impact."},
{id:"marketing",name:"Customer acquisition",hint:"Design one measurable acquisition test."},
{id:"finance",name:"Pricing & finances",hint:"Spot missing financial facts and explore the economics."},
{id:"funding",name:"Funding readiness",hint:"Find what an application or pitch still needs."},
{id:"operations",name:"Operations",hint:"Find bottlenecks and practical controls."},
{id:"ask",name:"Ask anything",hint:"Ask a specific question based on your business."}
];
const CORE={
 idea:[
 ["define-customer","Name the customer with the problem","Describe a specific customer group and when the problem arises."],
 ["problem-evidence","Collect direct customer evidence","Record interviews, observations or real buying behaviour."],
 ["compare-alternatives","Compare existing alternatives","Include doing nothing and substitutes; do not claim zero competition."],
 ["small-test","Design a low-cost demand test","Set the cost, success measure and stop condition in advance."]
 ],
 planning:[
 ["offer","Define one clear initial offer","Specify what's included, excluded, delivered and priced."],
 ["unit-economics","Test your unit economics","Calculate variable costs, contribution margin and monthly break-even."],
 ["distribution","Choose a customer acquisition channel","Identify the buyer, message, channel, conversion step and measurement."],
 ["risk-plan","List the three main execution risks","Name the evidence and mitigation for each."]
 ],
 setup:[
 ["licences","Verify business registration and permits","Use the applicable official authorities for your industry and location."],
 ["money-setup","Separate business finances","Plan recordkeeping, payment collection, invoicing and tax obligations."],
 ["delivery","Set up a reliable delivery process","Define quality, suppliers, capacity and customer communication."],
 ["contact","Make the business contactable","Set up accurate contact details and an appropriate public profile."]
 ],
 launch:[
 ["pilot","Complete one real sales pilot","Track enquiries, conversions, costs and customer feedback."],
 ["launch-presence","Publish a clear customer-facing offer","Create accurate website or social profile content with one next action."],
 ["followup","Establish a follow-up process","Track prospects and set follow-up ownership and timing."],
 ["launch-review","Review launch evidence","Compare actual outcomes with your launch goals."]
 ],
 operating:[
 ["scorecard","Record operating numbers weekly","Track revenue, contribution, leads, conversion and recurring costs."],
 ["retention","Measure retention and service quality","Track repeat customers, complaints and response speed."],
 ["process","Document one important workflow","Create an SOP with owner, standard and exception process."],
 ["cash","Review cash flow and capacity","Check upcoming obligations against realistic collections and workload."]
 ],
 scaling:[
 ["repeatability","Prove the existing model repeats","Show sustained margins and reliable delivery before expansion."],
 ["capacity","Test team and supplier capacity","Identify constraints, training and quality controls."],
 ["expansion-test","Plan the smallest expansion experiment","Set a market, budget, milestone and exit criteria."],
 ["systems","Formalize reporting and delegation","Move recurring work into defined processes and owner-reviewed reports."]
 ]
};
const SPECIFIC={
 tourism:["Partner distribution plan","Verify commissions, customer service ownership, supplier coverage and cancellation terms."],
 service:["Service delivery standard","Document appointment handling, service quality, staffing and customer follow-up."],
 retail:["Inventory and fulfillment","Test supplier lead times, inventory risk, returns and payment settlement."],
 food:["Food safety and service capacity","Verify relevant requirements, production consistency and peak-hour capacity."],
 technology:["Customer discovery and data safety","Define the MVP, user permissions, data handling and support workflow."],
 manufacturing:["Input supply and product quality","Confirm raw material supply, testing, yield, equipment and production costs."],
 other:["Industry-specific prerequisites","Identify the actual permits, operating dependencies and customer trust factors."]
};
const GOAL_TASKS={
 validate:["Define a pass/fail decision","Write the evidence that would justify proceeding, pivoting or stopping."],
 customers:["Create one customer acquisition test","Set a target customer, a channel, message and measurable result."],
 funding:["Build a funding readiness folder","Assemble verified business records, evidence, budgets and financial documents."],
 finance:["Review cash flow and contribution margin","Distinguish revenue from profit and calculate an affordable price."],
 digital:["Create a digital presence checklist","Select appropriate channels and check platform eligibility first."],
 operations:["Identify the most expensive recurring bottleneck","Estimate its impact and test a simpler workflow before automation."]
};
export function getRoadmap(business){
 const stage=CORE[business.stage]||CORE.idea;
 const industry=SPECIFIC[business.industry]||SPECIFIC.other;
 const goal=GOAL_TASKS[business.goal]||GOAL_TASKS.validate;
 return [
  ...stage.map(([id,title,description])=>({id:business.stage+"-"+id,title,description,tag:"Your stage"})),
  {id:"industry-"+(business.industry||"other"),title:industry[0],description:industry[1],tag:"Industry"},
  {id:"goal-"+(business.goal||"validate"),title:goal[0],description:goal[1],tag:"Your goal"}
 ];
}
export function getReadiness(b){
 const tests=[
 ["Defined customer",Boolean(b.customer?.trim())],
 ["Specific customer problem",Boolean(b.problem?.trim())],
 ["Clear offer or proposed solution",Boolean(b.solution?.trim())],
 ["Supporting evidence",Boolean(b.evidence?.trim())]
 ];
 const completed=tests.filter(x=>x[1]).length;
 return {tests,completed,total:tests.length,description:completed===4?"Basic business context is recorded. Validate the quality of your evidence before making major commitments.":"Missing business inputs must be resolved before a confident recommendation."};
}
export function getSuggestedQuestion(b,mode="assessment"){
 const options={
 assessment:"Assess this business as it stands. Separate verified facts, assumptions and evidence gaps. What are the three most useful next moves?",
 challenge:"What are the weakest assumptions in this business and the cheapest ways to test them?",
 roadmap:"Using my business stage, industry, and goals, prioritize my next three measurable actions.",
 marketing:"Design one small customer acquisition experiment with a clear offer, message, channel and success metric.",
 finance:"What numbers are missing to evaluate my pricing, contribution margin, cash flow and break-even?",
 funding:"Assess my funding readiness, identify missing documents and explain what I must verify before applying.",
 operations:"Identify likely operational bottlenecks and propose a low-complexity process improvement.",
 ask:"What should I focus on next based on the actual evidence in this business?"
 };
 return options[mode]||options.assessment;
}
