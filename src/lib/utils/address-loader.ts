import { PUBLIC_MAPS_API_KEY, PUBLIC_SITE_COUNTRY } from '$env/static/public';
import { Loader as PlacesApiLoader } from '@googlemaps/js-api-loader';

export default class Loader {
	form_id: string;
	constructor({ form_id }: { form_id: string }) {
		this.form_id = form_id;
	}

	async load() {
		const form = document.getElementById(this.form_id);

		if (!form) return;

		const loader = new PlacesApiLoader({
			apiKey: PUBLIC_MAPS_API_KEY,
			version: 'weekly',
			libraries: ['places']
		});

		const { Autocomplete } = await loader.importLibrary('places');
		form.querySelector('input[name=street_address]');
		const autocomplete = new Autocomplete(
			form.querySelector('input[name=street_address]') as HTMLInputElement,
			{
				fields: ['place_id', 'address_components', 'name', 'type'],
				componentRestrictions: { country: PUBLIC_SITE_COUNTRY },
				strictBounds: false,
				types: ['address']
			}
		);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();

			(form.querySelector('input[name=street_address]') as HTMLInputElement).value =
				place.name ?? '';
			(form.querySelector('input[name=city]') as HTMLInputElement).value =
				place.address_components?.find((x) => x.types.includes('locality'))?.long_name ?? '';
			(form.querySelector('input[name=state]') as HTMLInputElement).value =
				place.address_components?.find((x) => x.types.includes('administrative_area_level_1'))
					?.long_name ?? '';
			(form.querySelector('input[name=country]') as HTMLInputElement).value =
				place.address_components?.find((x) => x.types.includes('country'))?.short_name ?? '';

			(form.querySelector('input[name=postal_code]') as HTMLInputElement).value =
				place.address_components?.find((x) => x.types.includes('postal_code'))?.short_name ?? '';

			(form.querySelector('input[name=place_id]') as HTMLInputElement).value = place.place_id ?? '';
		});
	}
}
