<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
                CREATE TRIGGER tr_increment_document_correlat BEFORE INSERT on ordenes 
                FOR EACH ROW	
                BEGIN
                    SET @newCorrelat = 0;
                    SELECT COUNT(*) INTO @totReg FROM ordenes;
    
                    IF NEW.tipo_documento = "F" THEN
                        IF @totReg > 0 THEN
                            SELECT MAX(num_factura) INTO @newCorrelat FROM ordenes;						
                        END IF;
                        SET NEW.num_factura = @newCorrelat + 1;
                        -- UPDATE ordenes SET num_factura = @newCorrelat WHERE id = NEW.id;
                    END IF;
    
                    IF NEW.tipo_documento = "B" THEN
                        IF @totReg > 0 THEN
                            SELECT MAX(num_boleta) INTO @newCorrelat FROM ordenes;
                        END IF;
                        SET NEW.num_boleta = @newCorrelat + 1;
                        -- UPDATE ordenes SET num_boleta = @newCorrelat WHERE id = NEW.id;
                    END IF;
                END;
            ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP TRIGGER tr_increment_document_correlat");
    }
}
