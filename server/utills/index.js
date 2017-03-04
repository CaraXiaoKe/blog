module.exports = {
	mergeTypesHash(dict){
		let k = {};
		dict.forEach(function(item){
			k[item.field_id] = item.field_name;
			item.field_members.forEach(function(member){
				k[member.field_member_id] =  member.field_member_name;
			})
		});
		return k;
	}




}