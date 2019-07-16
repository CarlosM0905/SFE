-- Vistas 
CREATE VIEW vista_inventario AS (SELECT producto.pro_id, producto.pro_nombre, producto.pro_precio, producto.pro_stock, producto.cat_id, producto.umed_id, categoria.cat_tipo, unidad_medida.umed_nombre FROM producto INNER JOIN categoria ON producto.cat_id = categoria.cat_id INNER JOIN unidad_medida ON producto.umed_id = unidad_medida.umed_id);
CREATE VIEW vista_clientes AS (SELECT pe_jur_ruc, pe_jur_razon_social, pe_jur_direccion, pe_jur_email FROM persona_juridica UNION SELECT pe_nat_dni, CONCAT(pe_nat_nombres ," " , pe_nat_apellidos), pe_nat_direccion, pe_nat_email FROM persona_natural);
CREATE VIEW vista_productos_factura AS (SELECT pro_id, pro_nombre, pro_precio, pro_stock, umed_nombre, producto.umed_id FROM mydb.producto INNER JOIN mydb.unidad_medida ON producto.umed_id = unidad_medida.umed_id);
CREATE VIEW vista_productos_boleta AS (SELECT pro_id, pro_nombre, pro_precio, pro_stock, umed_nombre, producto.umed_id FROM mydb.producto INNER JOIN mydb.unidad_medida ON producto.umed_id = unidad_medida.umed_id);

-- Trigger
DELIMITER //
CREATE TRIGGER check_insert BEFORE INSERT 
ON producto
FOR EACH ROW
BEGIN
	IF ( NEW.pro_precio < 0) THEN
		SET NEW.pro_precio  = 0;
    END IF;
    IF ( NEW.pro_stock < 0) THEN
		SET NEW.pro_stock = 0;
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER check_update BEFORE UPDATE 
ON producto
FOR EACH ROW
BEGIN
	IF ( NEW.pro_nombre = OLD.pro_nombre AND NEW.cat_id = OLD.cat_id AND NEW.umed_id = OLD.umed_id) THEN
		SET NEW.pro_stock = OLD.pro_stock + NEW.pro_stock;
    END IF;
END //    
DELIMITER ;


