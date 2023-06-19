/** @format */
import React from 'react';
import Evidence from '../images/evidence.jpeg';
import Glacier from '../images/glacier.jpeg';
import Cause_1 from '../images/causes1.jpeg';
import Cause_2 from '../images/deforestration.jpeg';
import Cause_3 from '../images/cause_3.jpeg';
import Effect_1 from '../images/effect_1.jpeg';
import Effect_2 from '../images/effect_2.jpeg';
import Effect_3 from '../images/effect_3.jpeg';

const Section = ({ imgSrc, imgAlt, title, description }) => {
	return (
		<section>
			<div className='flex flex-col text-center space-y-5'>
				<h1 className='text-3xl font-bold'>{title}</h1>
				<p className='text-xl'>{description}</p>
			</div>
			<img src={imgSrc} alt={imgAlt} className='w-full rounded-md h-[60vh] my-10' />
		</section>
	);
};
const Section_2 = ({ imgSrc, imgAlt, description }) => {
	return (
		<div className='flex flex-col'>
			{/*Image*/}
			<div className='mx-auto'>
				<img src={imgSrc} alt={imgAlt} className='rounded-md w-60 h-40' />
			</div>
			{/*descritpion*/}
			<div className='text-m w-60 mx-auto text-center h-auto'>{description}</div>
		</div>
	);
};
const Facts = () => {
	return (
		<main className='mx-20'>
			<Section
				imgSrc={Glacier}
				imgAlt={'climate_1'}
				title={'What is climate change?'}
				description={
					'Climate change is a real and pressing issue that is affecting the African continent. Scientific evidence gathered over the years confirms the reality of climate change. Temperature records show a clear warming trend, and numerous studies highlight the changes in weather patterns and ecosystems. These changes are attributed to the increase in greenhouse gas emissions, primarily caused by human activities such as burning fossil fuels and deforestation.'
				}
			/>
			<Section
				imgSrc={Evidence}
				imgAlt={'climate_1'}
				title={'Evidence of Climate Change'}
				description={
					'African coastal regions are experiencing the effects of rising sea levels, leading to coastal erosion, saltwater intrusion into freshwater sources, and increased vulnerability of coastal communities to storm surges and flooding. Africa has also witnessed shifts in precipitation patterns, including changes in rainfall distribution and intensity. This has resulted in droughts, floods, and more frequent extreme weather events, impacting agriculture, water resources, and livelihoods. Climate change is threatening the rich biodiversity of Africa. Changing temperatures and rainfall patterns can disrupt ecosystems, leading to habitat loss, species migration, and potential extinction of unique and endemic flora and fauna.'
				}
			/>
			<section>
				<div className='flex flex-col text-center space-y-5'>
					<h1 className='text-3xl font-bold'>Human Impact on Climate Change</h1>
					<p className='text-xl'>
						Human activities have a profound impact on climate change. The burning of fossil fuels, such as coal, oil, and natural gas, for energy production releases large amounts of
						greenhouse gases, particularly carbon dioxide (CO2), into the atmosphere. These greenhouse gases trap heat from the sun, leading to a rise in global temperatures and
						contributing to the greenhouse effect. Deforestation, another human activity, reduces the Earth's capacity to absorb CO2, as trees act as carbon sinks. Additionally, industrial
						processes, agricultural practices, and the use of certain chemicals release other potent greenhouse gases like methane (CH4) and nitrous oxide (N2O). These activities intensify
						the greenhouse effect, leading to global warming and the disruption of climate patterns worldwide. It is crucial to address these human-induced factors to mitigate climate
						change and transition towards sustainable practices that reduce greenhouse gas emissions and promote environmental stewardship.
					</p>
				</div>
				<div className='grid md:grid-cols-3 m-5'>
					<Section_2 imgSrc={Cause_1} imgAlt={'tab1'} description={'Pollution'} />
					<Section_2 imgSrc={Cause_2} imgAlt={'tab1'} description={'Deforestration'} />
					<Section_2 imgSrc={Cause_3} imgAlt={'tab1'} description={'Improper waste Disposal'} />
				</div>
			</section>
			<section>
				<div className='flex justify-center text-center'>
					<h1 className='text-3xl font-bold'>Effects of Climate Change</h1>
				</div>
				<div className='grid md:grid-cols-3 m-5'>
					<Section_2 imgSrc={Effect_1} imgAlt={'tab1'} description={'Flooding'} />
					<Section_2 imgSrc={Effect_2} imgAlt={'tab1'} description={'Wildfires'} />
					<Section_2 imgSrc={Effect_3} imgAlt={'tab1'} description={'Drought'} />
				</div>
			</section>
			<div className='flex w-full justify-center mb-5'>
				<a href='discover' className='text-xl font-bold px-5 py-3 bg-primary text-white rounded-md '>
					View Solutions
				</a>
			</div>
		</main>
	);
};

export default Facts;
