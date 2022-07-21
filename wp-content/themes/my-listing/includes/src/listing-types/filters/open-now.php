<?php

namespace MyListing\Src\Listing_Types\Filters;

if ( ! defined('ABSPATH') ) {
	exit;
}

class Open_Now extends Base_Filter {
	public function filter_props() {
		$this->props['type'] = 'open-now';
		$this->props['label'] = 'Open Now';
	}

	public function apply_to_query( $args, $form_data ) {
		global $wpdb;

		if ( empty( $form_data[ $this->get_form_key() ] ) ) {
			return $args;
		}


		$indexes = [
			'Monday' => 0,
			'Tuesday' => 1,
			'Wednesday' => 2,
			'Thursday' => 3,
			'Friday' => 4,
			'Saturday' => 5,
			'Sunday' => 6,
		];

		$utc = c27()->utc();
		$index = $indexes[ $utc->format('l') ];
		$day_start = 1440 * $index;
		$minute_utc = $day_start + ( absint( $utc->format('H') ) * 60 ) + absint( $utc->format('i') );

		$site_tz = new \DateTime( 'now', wp_timezone() );
		$index = $indexes[ $site_tz->format('l') ];
		$day_start = 1440 * $index;
		$minute_site_tz = $day_start + ( absint( $site_tz->format('H') ) * 60 ) + absint( $site_tz->format('i') );

		$sql = <<<SQL
			SELECT listing_id FROM {$wpdb->prefix}mylisting_workhours
			WHERE ( CONVERT_TZ(UTC_TIMESTAMP(), "UTC", "Europe/Tirane") IS NOT NULL AND %d BETWEEN
				( `start` + TIMESTAMPDIFF(
					MINUTE, UTC_TIMESTAMP(), CONVERT_TZ(UTC_TIMESTAMP(), "UTC", timezone)
				) ) AND ( `end` + TIMESTAMPDIFF(
					MINUTE, UTC_TIMESTAMP(), CONVERT_TZ(UTC_TIMESTAMP(), "UTC", timezone)
				) )
			) OR ( CONVERT_TZ(UTC_TIMESTAMP(), "UTC", "Europe/Tirane") IS NULL AND %d BETWEEN `start` AND `end` )
			GROUP BY listing_id
		SQL;

		$rows = $wpdb->get_col( $wpdb->prepare( $sql, $minute_utc, $minute_site_tz ) );

		$ids = array_map( 'absint', (array) $rows );
		if ( empty( $ids ) ) {
			$ids = [0];
		}

		if ( ! empty( $args['post__in'] ) ) {
			$ids = array_intersect( $args['post__in'], $ids );
			if ( empty( $ids ) ) {
				$ids = [0];
			}
		}

		$args['post__in'] = $ids;
		return $args;
	}

	public function get_choices() {
		$options = (array) ['open' => esc_html__( 'Open Now', 'my-listing' ) ];

		$list = [];
		foreach ( $options as $value => $label ) {
			$list[] = [
	            'value' => urlencode( $value ),
	            'label' => $label,
	            'selected' => false,
	        ];
	    }

	    return $list;
	}

	public function get_request_value() {
		return isset( $_GET[ $this->get_form_key() ] )
			? sanitize_text_field( stripslashes( $_GET[ $this->get_form_key() ] ) )
			: '';
	}
}
