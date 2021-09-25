$(document).ready(function() {
	// ALL -----------------------------------------------------------------
	// Change choosen tab
	$('ul.choice li').click(function() {
		$('ul.choice li').removeClass('active');
		$(this).addClass('active');

		change_itm($(this).text());
	});

	$('body').keyup(function(e) {
		if (e.which == 32) {
			var txt = $('ul.choice li.active').text();
			change_itm(txt);
		}
		
	});

	// Lists of classes
	var cl_nms = [0, 'cl_red', 'cl_blue', 'cl_green', 'cl_black', 'cl_orange', 'cl_grey', 'cl_purple', 'cl_brown', 'cl_yellow'];
	var bk_nms = [0, 'bk_red', 'bk_blue', 'bk_green', 'bk_black', 'bk_orange', 'bk_grey', 'bk_purple', 'bk_brown', 'bk_yellow'];

	// TABLES ---------------------------------------------------------------
	// Changing numbers
	$('ul.s1 li span').click(function() {
		var ths_ID = '#' + $(this).parent().attr('id');
		var vl = parseInt($(ths_ID + ' input').val());
		if ($(this).hasClass('nxt')) {
			if (ths_ID == '#mernost' && vl < 10 ||
				ths_ID == '#numbers' && vl < 3 ||
				ths_ID == '#objects' && vl < 10) {
				$(ths_ID + ' input').val(vl+1);
			}
		} else {
			if (ths_ID == '#mernost' && vl > 3 ||
				ths_ID == '#numbers' && vl > 1 ||
				ths_ID == '#objects' && vl > 1) {
				$(ths_ID + ' input').val(vl-1);
			}
		}	
	});

	var lis = 1;
	var tbls = [];
	var tbls_names = [];

	// Creating new table
	$('#create_table').click(function(){
		var cells = parseInt($('#mernost input').val());
		var nums = parseInt($('#numbers input').val());
		var max = 9;
		var res = '';

		// Maximum of numbers in cells
		if (nums == 1) { max = 9;
		} else if (nums == 2) { max = 99;
		} else { max = 999; }

		// Checking checkboxes
		var nms, clls, figs, pics = false;
		if ($('#ch1').prop('checked')) { nms = true; }
		if ($('#ch2').prop('checked')) { clls = true; }
		if ($('#ch3').prop('checked')) { figs = true; }
		if ($('#ch4').prop('checked')) { pics = true; }

		// If there are objects create matrix of table
		if (figs || pics) {
			var obj = parseInt($('#objects input').val());
			var all_cells = cells * cells;
			var all_obj = Math.round(all_cells / 100 * (obj*10));
			
			// Creating list of cells (obj or num)
			var lst_cells = [];
			for (i=1; i <= all_cells; i++) {
				if (all_obj >= 1) {
					lst_cells.push('obj');
					--all_obj;
				} else {
					lst_cells.push('num');
				}
			}

			lst_cells.sort(list_rand);
		}

		// Writing new cells
		var row = 1;
		for (x = 1; x <= cells; x++) {
			res += '<tr>';
			var nm = cells * (row-1); 
			// Writing td in this tr
			for (y = 1; y <= cells; y++) {
				// If there are only numbers
				if (!figs && !pics) {
					res += cell_set(nms, clls) + rand_num(max) + '</td>';
				// If there are any figures or pictures
				} else {
					if (lst_cells[nm] == 'obj') {
						
						if (figs && pics) {
							var rand = rand_num(2);
							if (rand == 1) {
								var o_path = 'img/figures/';
								var max2 = 5;
								res += cell_set(nms, clls) + cell_content(o_path, max2) + '</td>';
							} else {
								var o_path = 'img/pics/';
								var max2 = 140;
								res += cell_set(nms, clls) + cell_content(o_path, max2) + '</td>';
							}
						} else if (figs && !pics) {
							var o_path = 'img/figures/';
							var max2 = 5;
							res += cell_set(nms, clls) + cell_content(o_path, max2) + '</td>';
						} else if (!figs && pics) {
							var o_path = 'img/pics/';
							var max2 = 140;
							res += cell_set(nms, clls) + cell_content(o_path, max2) + '</td>';
						}

					} else {
						res += cell_set(nms, clls) + rand_num(max) + '</td>';
					}
					++nm;		
				}
			}
			++row;
			res += '</tr>';
		}

		$('#tbl').html(res);

		// Adding info of table
		var names = [0, 'Есмеральда', 'Изумруд', 'Абраксас', 'Антелопа', 'Майтрейя', 'Нараяна', 'Говинда', 'Пушистик', 'Сапфир', 'Алмаз', 'Шанкара', 'Шакти', 'Гампопа', 'Мандалешвара'];
		if (obj == 10) { var lst = 'Объекты';
		} else { var lst = nums };

		// Creating name of table
		var ths_table = names[rand_num(14)] + ' ' + rand_num(9) + rand_num(9) + rand_num(9) + ' - ' + cells + 'x' + cells + '(' + lst + ')';
		$('.tbl_name').html(ths_table);
		
		if ($('.tbls_lst li').text() == 'Пока отсутствуют.') {
			$('.tbls_lst li').html(ths_table);
			$('.tbls_lst li').addClass('some_tbl');
			$('.tbls_lst li').attr('id', 'l1');
			tbls = [];
			tbls_names = [];
			tbls_names.push(ths_table);
			tbls.push(res);
		} else if (lis < 6) {
			++lis;
			$('.tbls_lst').append('<li class="some_tbl" id="l' + lis + '">' + ths_table + '</li>');
			tbls.push(res);
			tbls_names.push(ths_table);
		} else {
			$('.tbls_lst').append('<li class="some_tbl">' + ths_table + '</li>');
			tbls.splice(0, 1);
			tbls.push(res);
			tbls_names.splice(0, 1);
			tbls_names.push(ths_table);

			$('.tbls_lst li#l1').remove();
			$('.tbls_lst li#l2').removeAttr('id').attr('id', 'l1');
			$('.tbls_lst li#l3').removeAttr('id').attr('id', 'l2');
			$('.tbls_lst li#l4').removeAttr('id').attr('id', 'l3');
			$('.tbls_lst li#l5').removeAttr('id').attr('id', 'l4');
			$('.tbls_lst li#l6').removeAttr('id').attr('id', 'l5');
			$('.tbls_lst li:last-child').attr('id', 'l6');
		}

	});

	// Loading old table
	$('body').on('click', '.tbls_lst li', function() {
		var ths = parseInt($(this).attr('id').replace('l', ''));

		$('#tbl').html(tbls[ths-1]);
		$('.tbl_name').html(tbls_names[ths-1]);
	});

	// Randomizing items in array
	function list_rand(a, b) {
		return Math.random() - 0.5;
	}

	// Count content of cell
	function cell_content(o_path, max2) {
		var figs = figs;
		var pics = pics;
		var max2 = max2;

		if (max2 == 140) { var pref = '.png'; } 
		else { var pref = '.gif'; }

		var res = '<img src="' + o_path + rand_num(max2) + pref + '" height="84" width="84">';
		return res;
	}

	// Settings of cells in table
	function cell_set(nms, clls) {
		var nms = nms;
		var clls = clls;
		var td = '<td ';

		// Colored numbers
		if (nms) { 
			td += 'class="' + cl_nms[rand_num(9)];
			// Colored numbers and cells
			if (clls) { td += ' ' + bk_nms[rand_num(9)]; }
		}

		// Colored cells
		if (clls && !nms) { td += 'class="' + bk_nms[rand_num(9)]; }
		if (nms || clls) { td += '"'; }
		td += '>';
		return td;
	}

	// Random number
	function rand_num(max) {
		var max = max;
		return Math.floor((Math.random()*max) + 1);
	}

	// Saving table
	$('button.save').click(function() {
		var name = $('.tbl_name').text() + '.html';
		var table = '<table>' + $('table#tbl').html() + '</table>';


	});

	// RANDOM -----------------------------------------------------------------
	// Changing item
	function change_itm(txt) {
		var txt = txt;

		if (txt == 'Images') {
			var res = '<img src="img/pictures/' + rand_num(140) + '.png" alt="" />';		
		}

		if (txt == 'Numbers') {
			var res = '<span>' + rand_num(999) + '<span/>';		
		}

		if (txt == 'Figures') {
			var res = '<img src="img/figures/' + rand_num(5) + '.gif" alt="" />';
		}

		if (txt == 'Colors') {
			var res = '<div class="color ' + bk_nms[rand_num(9)] + '"></div>';
		}

		if (txt == 'Stereo') {
			var res = '<img class="stereo" src="img/stereo/img_' + rand_num(1213) + '.jpg" alt="" />';	
			console.log(res);	
		}

		$('.object').html(res);
	}
	
});