

INSERT INTO mydb.modo_pago (mod_nombre) VALUES ("Credito");
INSERT INTO mydb.modo_pago (mod_nombre) VALUES ("Debito");
INSERT INTO mydb.modo_pago (mod_nombre) VALUES ("Efectivo");
INSERT INTO mydb.modo_pago (mod_nombre) VALUES ("Transferencia Bancaria");
INSERT INTO mydb.modo_pago (mod_nombre) VALUES ("Ingreso Bancario");

INSERT INTO mydb.categoria (cat_tipo) VALUES ("Comestibles");
INSERT INTO mydb.categoria (cat_tipo) VALUES ("Bebidas");
INSERT INTO mydb.categoria (cat_tipo) VALUES ("Empaquetados");
INSERT INTO mydb.categoria (cat_tipo) VALUES ("No empaquetados");
INSERT INTO mydb.categoria (cat_tipo) VALUES ("Utiles de Oficina");
INSERT INTO mydb.categoria (cat_tipo) VALUES ("Otros");

INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Galletas", 1.20, 25, 1);
INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Agua Mineral", 1.50, 50, 2);
INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Jugo de Durazno", 4.60, 30, 3);
INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Caramelos", 4.50, 70, 4);
INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Paq. Hojas Bond", 7.50 , 25, 5);
INSERT INTO mydb.producto (pro_nombre, pro_precio, pro_stock, cat_id) VALUES ("Bencina", 3.20, 12, 6);

INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Paquete");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Unidad");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Tetra-Pack");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Bolsa");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Kilo");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Millar");
INSERT INTO mydb.unidad_medida (umed_nombre) VALUES ("Caja");

INSERT INTO mydb.persona_natural (pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion, pe_nat_email) VALUES ("Carlos Manuel", "Rodriguez Lazo" , "73973468" , "Urbanizacion Santa Marina" , "carlos.rodriguez47@gmail.com");
INSERT INTO mydb.persona_natural (pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion, pe_nat_email) VALUES ("Melinna Victoria", "Rojas Camargo" , "73008470" , "Urbanizacion Los Topacios" , "melin1504@gmail.com");
INSERT INTO mydb.persona_natural (pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion, pe_nat_email) VALUES ("Diego Rafael", "Tueros Huapaya" , "74673189" , "Urbanizacion El Solar" , "rafotueros777@gmail.com");
INSERT INTO mydb.persona_natural (pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion, pe_nat_email) VALUES ("David", "Albornoz Trejo" , "71243653" , "Urbanizacion El Agustino" , "david.albornoz@gmail.com");
INSERT INTO mydb.persona_natural (pe_nat_nombres, pe_nat_apellidos, pe_nat_dni, pe_nat_direccion, pe_nat_email) VALUES ("Franz", "Carharicra Marcelo" , "76742899" , "Urbanizacion Palomino" , "franzbot@gmail.com");

INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("Asociacion DataInformix SA", "20729734687", "Av. Camino Real", "datainf@yopmail.com" );
INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("ETRAMAR SA", "20730084701", "Av. Realidad", "etram@yopmail.com" );
INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("Head & Shoulders SAC", "20721454617", "Av. Balneario", "hys@yopmail.com" );
INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("Estudios Graficos AC", "20120034687", "Jr. Los Pueblos", "egAC@yopmail.com" );
INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("SISE", "20729736527", "Av. Python", "SISE21@yopmail.com" );
INSERT INTO mydb.persona_juridica ( pe_jur_razon_social, pe_jur_ruc, pe_jur_direccion, pe_jur_email) VALUES ("Collins SA", "20342734687", "Plaza La Colmena", "col123@yopmail.com" );

INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2018-12-24", 24.50, "Dolares", 1, 2);
INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2015-11-20", 124.00, "Soles", 3, 3);
INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2010-02-12", 254.50, "Soles", 2, 1);
INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2014-08-04", 65.00, "Soles", 4, 1);
INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2012-05-23", 76.50, "Dolares", 2, 2);
INSERT INTO mydb.boleta ( bol_fecha, bol_mtotal, bol_tipo_moneda, pe_nat_id, mod_id) VALUES ("2013-10-07", 32.00, "Dolares", 1, 2);


INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2015-05-15", 23.43, "Dolares", 3, 1);
INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2016-02-17", 23.43, "Soles", 2, 1);
INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2017-03-25", 23.43, "Soles", 3, 1);
INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2018-12-15", 23.43, "Soles", 1, 1);
INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2019-05-30", 23.43, "Dolares", 2 , 1);
INSERT INTO mydb.factura( fac_fecha, fac_mtotal, fac_tipo_moneda, pe_jur_id, mod_id) VALUES ( "2004-02-10", 23.43, "Dolares", 3, 1);

INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 1, 2, 12.34, 12, 1);
INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 1, 3, 23.44, 32, 4);
INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 1, 4, 43.56, 41, 5);
INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 2, 1, 12.34, 52, 7);
INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 1, 1, 76.81, 32, 3);
INSERT INTO mydb.detalle_boleta ( bol_id, pro_id, detb_monto, detb_cantidad, umed_id ) VALUES ( 2, 2, 163.00, 43, 2);


INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 1, 3, 32.43, 14,2);
INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 1, 4, 23.43, 21,1);
INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 1, 1, 32.43, 32,1);
INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 1, 2, 43.43, 45,3);
INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 1, 5, 74.43, 14,3);
INSERT INTO mydb.detalle_factura ( fac_id, pro_id, detf_monto, detf_cantidad, umed_id) VALUES ( 2, 3, 120.43, 14,1);
