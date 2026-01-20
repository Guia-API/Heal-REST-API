CREATE DATABASE IF NOT EXISTS `heal-rest-db`;
USE `heal-rest-db`;

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `status` TINYINT(4) NOT NULL DEFAULT 1,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `uk_user_email` (`email`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `patient` (
  `id_patient` int(5) NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(260) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `address` VARCHAR(260) NOT NULL,
  `date_birth` date NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_patient`),
  UNIQUE KEY `uk_patient_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE refresh_token (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(token),
  FOREIGN KEY (id_user) REFERENCES user(id_user)
);

CREATE TABLE IF NOT EXISTS `employee` (
  `id_employee` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `full_name` VARCHAR(260) NOT NULL,
  `date_birth` DATE NOT NULL,
  `cell_phone` VARCHAR(30) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_employee`),
  CONSTRAINT `fk_employee_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `emergency_contact` (
  `id_emergency_contact` int(5) NOT NULL AUTO_INCREMENT,
  `id_patient` int(5) NOT NULL,
  `full_name` VARCHAR(260) NOT NULL,
  `kinship` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_emergency_contact`),
  KEY `id_patient_emergency_contact` (`id_patient`),
  CONSTRAINT `id_patient_emergency_contact` FOREIGN KEY (`id_patient`) REFERENCES `patient` (`id_patient`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `medical_history` (
  `id_medical_history` int(5) NOT NULL AUTO_INCREMENT,
  `id_patient` int(5) NOT NULL,
  `chronic_diseases` VARCHAR(250) NOT NULL,
  `regular_medication` VARCHAR(250) NOT NULL,
  `observations` VARCHAR(250) NOT NULL,
  `allergies` VARCHAR(250) NOT NULL,
  `creation_date` datetime NOT NULL,
  `personal_medical_history` VARCHAR(250) NOT NULL,
  `family_medical_history` VARCHAR(250) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_medical_history`),
  KEY `id_patient_history` (`id_patient`),
  CONSTRAINT `id_patient_history` FOREIGN KEY (`id_patient`) REFERENCES `patient` (`id_patient`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `medical_appointment` (
  `id_medical_appointment` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `id_patient` int(11) NOT NULL DEFAULT 0,
  `id_employee` int(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_medical_appointment`),
  KEY `id_patient_medical_appoinment` (`id_patient`),
  KEY `id_employee_medical_appointment` (`id_employee`),
  CONSTRAINT `id_employee_medical_appointment` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id_employee`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_patient_medical_appoinment` FOREIGN KEY (`id_patient`) REFERENCES `patient` (`id_patient`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `medical_examination` (
  `id_medical_examination` int(11) NOT NULL AUTO_INCREMENT,
  `id_medical_history` int(11) DEFAULT NULL,
  `prescription` VARCHAR(500) NOT NULL,
  `medical_diagnosis` VARCHAR(500) NOT NULL,
  `symptoms` VARCHAR(500) NOT NULL,
  `date` datetime NOT NULL,
  `reason` VARCHAR(500) NOT NULL,
  `comments` VARCHAR(500) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_medical_examination`),
  KEY `FK_medical_examination_medical_history` (`id_medical_history`),
  CONSTRAINT `FK_medical_examination_medical_history` FOREIGN KEY (`id_medical_history`) REFERENCES `medical_history` (`id_medical_history`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;