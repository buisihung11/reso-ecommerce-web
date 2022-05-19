export type TMenu = {
menu_id: number;
menu_name: string;
is_brand: boolean;
start_time:Date;
end_time:Date;
create_at:Date;
day_filter:number[];
time_ranges:Date[];
day_filters:number[];
priority:number;
store_names:string;	
page:number;
size:number;
fields:string[]
}