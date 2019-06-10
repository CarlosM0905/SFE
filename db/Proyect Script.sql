-- -----------------------------------------------------
-- Esquema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb`;

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;


-- -----------------------------------------------------
-- Tabla persona natural
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`persona_natural`;

CREATE TABLE IF NOT EXISTS `mydb`.`persona_natural` (
  `pe_nat_id` INT NOT NULL AUTO_INCREMENT,
  `pe_nat_nombres` VARCHAR(30) NOT NULL,
  `pe_nat_apellidos` VARCHAR(30) NOT NULL,
  `pe_nat_dni` VARCHAR(10) NOT NULL,
  `pe_nat_direccion` VARCHAR(70) NOT NULL,
  `pe_nat_email` VARCHAR(45) CHARACTER SET 'big5' NULL,
  PRIMARY KEY (`pe_nat_id`),
  UNIQUE INDEX `pe_nat_id_UNIQUE` (`pe_nat_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_nat_dni_UNIQUE` (`pe_nat_dni` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla persona juridica
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`persona_juridica`;

CREATE TABLE IF NOT EXISTS `mydb`.`persona_juridica` (
  `pe_jur_id` INT NOT NULL AUTO_INCREMENT,
  `pe_jur_razon_social` VARCHAR(50) NOT NULL,
  `pe_jur_ruc` VARCHAR(11) NOT NULL,
  `pe_jur_direccion` VARCHAR(65) NOT NULL,
  `pe_jur_email` VARCHAR(45) NULL,
  PRIMARY KEY (`pe_jur_id`),
  UNIQUE INDEX `pe_jur_id_UNIQUE` (`pe_jur_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_jur_ruc_UNIQUE` (`pe_jur_ruc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla modo pago
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`modo_pago`;

CREATE TABLE IF NOT EXISTS `mydb`.`modo_pago` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mod_id`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Tabla factura
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`factura`;

CREATE TABLE IF NOT EXISTS `mydb`.`factura` (
  `fac_id` INT NOT NULL AUTO_INCREMENT,
  `fac_fecha` DATE NOT NULL,
  `fac_mtotal` DECIMAL(10,2) NOT NULL,
  `fac_tipo_moneda` VARCHAR(45) NOT NULL,
  `pe_nat_id` INT NULL,
  `pe_jur_id` INT NULL,
  `mod_id` INT NOT NULL,
  PRIMARY KEY (`fac_id`),
  INDEX `fk_factura_persona_natural_idx` (`pe_nat_id` ASC) VISIBLE,
  INDEX `fk_factura_persona_juridica1_idx` (`pe_jur_id` ASC) VISIBLE,
  INDEX `fk_factura_modo_pago1_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `fac_pe_nat_id`
    FOREIGN KEY (`pe_nat_id`)
    REFERENCES `mydb`.`persona_natural` (`pe_nat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fac_pe_jur_id`
    FOREIGN KEY (`pe_jur_id`)
    REFERENCES `mydb`.`persona_juridica` (`pe_jur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fac_mod_id`
    FOREIGN KEY (`mod_id`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla boleta
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`boleta`;

CREATE TABLE IF NOT EXISTS `mydb`.`boleta` (
  `bol_id` INT NOT NULL  AUTO_INCREMENT,
  `bol_fecha` DATE NOT NULL,
  `bol_mtotal` DECIMAL(10,2) NOT NULL,
  `bol_tipo_moneda` VARCHAR(45) NOT NULL,
  `pe_nat_id` INT NULL,
  `pe_jur_id` INT NULL,
  `mod_id` INT NOT NULL,
  PRIMARY KEY (`bol_id`),
  INDEX `fk_boleta_persona_natural1_idx` (`pe_nat_id` ASC) VISIBLE,
  INDEX `fk_boleta_persona_juridica1_idx` (`pe_jur_id` ASC) VISIBLE,
  INDEX `fk_boleta_modo_pago1_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `bol_pe_nat_id`
    FOREIGN KEY (`pe_nat_id`)
    REFERENCES `mydb`.`persona_natural` (`pe_nat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `bol_pe_jur_id`
    FOREIGN KEY (`pe_jur_id`)
    REFERENCES `mydb`.`persona_juridica` (`pe_jur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `bol_mod_id`
    FOREIGN KEY (`mod_id`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla categoria
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`categoria`;

CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `cat_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla producto
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`producto` ;

CREATE TABLE IF NOT EXISTS `mydb`.`producto` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_nombre` VARCHAR(45) NOT NULL,
  `pro_precio` DECIMAL(10,2) NOT NULL,
  `pro_stock` INT NOT NULL DEFAULT 0,
  `cat_id` INT NOT NULL,
  PRIMARY KEY (`pro_id`),
  INDEX `fk_producto_categoria1_idx` (`cat_id` ASC) VISIBLE,
  CONSTRAINT `pro_cat_id`
    FOREIGN KEY (`cat_id`)
    REFERENCES `mydb`.`categoria` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla unidad medida
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`unidad_medida` ;

CREATE TABLE IF NOT EXISTS `mydb`.`unidad_medida` (
  `umed_id` INT NOT NULL AUTO_INCREMENT,
  `umed_nombre` VARCHAR(20) NOT NULL DEFAULT 'UNIDAD',
  PRIMARY KEY (`umed_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla detalle factura
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`detalle_factura` ;

CREATE TABLE IF NOT EXISTS `mydb`.`detalle_factura` (
  `fac_id` INT NOT NULL,
  `pro_id` INT NOT NULL,
  `detf_monto` DECIMAL(10,2) NOT NULL,
  `detf_cantidad` INT NOT NULL,
  `umed_id` INT NOT NULL,
  PRIMARY KEY (`fac_id`, `pro_id`),
  INDEX `fk_factura_has_producto_producto1_idx` (`pro_id` ASC) VISIBLE,
  INDEX `fk_factura_has_producto_factura1_idx` (`fac_id` ASC) VISIBLE,
  INDEX `fk_detalle_factura_unidad_medida1_idx` (`umed_id` ASC) VISIBLE,
  CONSTRAINT `detf_fac_id`
    FOREIGN KEY (`fac_id`)
    REFERENCES `mydb`.`factura` (`fac_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detf_pro_id`
    FOREIGN KEY (`pro_id`)
    REFERENCES `mydb`.`producto` (`pro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detf_umed_id`
    FOREIGN KEY (`umed_id`)
    REFERENCES `mydb`.`unidad_medida` (`umed_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla detalle boleta
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`detalle_boleta`;

CREATE TABLE IF NOT EXISTS `mydb`.`detalle_boleta` (
  `bol_id` INT NOT NULL,
  `pro_id` INT NOT NULL,
  `detb_monto` DECIMAL(10,2) NOT NULL,
  `detb_cantidad` INT NOT NULL,
  `umed_id` INT NOT NULL,
  PRIMARY KEY (`bol_id`, `pro_id`),
  INDEX `fk_boleta_has_producto_producto1_idx` (`pro_id` ASC) VISIBLE,
  INDEX `fk_boleta_has_producto_boleta1_idx` (`bol_id` ASC) VISIBLE,
  INDEX `fk_detalle_boleta_unidad_medida1_idx` (`umed_id` ASC) VISIBLE,
  CONSTRAINT `detb_bol_id`
    FOREIGN KEY (`bol_id`)
    REFERENCES `mydb`.`boleta` (`bol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detb_pro_id`
    FOREIGN KEY (`pro_id`)
    REFERENCES `mydb`.`producto` (`pro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detb_umed_id`
    FOREIGN KEY (`umed_id`)
    REFERENCES `mydb`.`unidad_medida` (`umed_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


